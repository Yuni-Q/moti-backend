import {
  Controller,
  HttpStatus,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import jwt from 'jsonwebtoken';
import { User } from 'src/common/entity/User.entity';
import { CustomInternalServerErrorException } from 'src/common/exception/custom.interval.server.error.exception';
import { InvalidTokenException } from 'src/common/exception/invalid.token.exception';
import { RequireBodyException } from 'src/common/exception/require.body.exception';
import { RequireTokenException } from 'src/common/exception/require.token.exception';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { InvalidUserIdException } from 'src/users/exception/invalid.user.id.dto';
import { UsersService } from 'src/users/users.service';
import { Token } from './decorators/token.decorator';
import { ValidBody } from './decorators/valid.body';
import { SigninRequestDto } from './dto/signin.request.dto';
import { SigninResponseDto } from './dto/signin.response.dto';
import { ValidTokenException } from './exception/valid.token.exception';
import { SigninService } from './signin.service';

@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('authorization')
@ApiResponse({
  status: new RequireTokenException().statusCode,
  type: RequireTokenException,
  description: new RequireTokenException().message,
})
@ApiTags('signin')
@Controller('api/v1/signin')
export class SigninController {
  constructor(
    private readonly SigninService: SigninService,
    private readonly usersService: UsersService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SigninResponseDto,
    description: '성공',
  })
  @ApiOperation({ summary: 'refresh token으로 로그인' })
  @Post('refresh')
  async refresh(@Token() token: string): Promise<SigninResponseDto> {
    try {
      const result = jwt.verify(token, process.env.privateKey) as {
        snsId: string;
        snsType: string;
      };
      if (!result?.snsType || !result?.snsId) {
        throw new InvalidTokenException();
      }
      const user = await this.usersService.getUserBySnsIdAndSnsType(result);
      if (!user?.id) {
        throw new InvalidUserIdException();
      }
      const {
        accessToken,
        refreshToken,
      } = await this.SigninService.createToken(user);
      const signUp =
        !!user.name && !!user.birthday && !!user.email && !!user.gender;
      return {
        status: HttpStatus.CREATED,
        data: { accessToken, refreshToken, signUp },
      };
    } catch (error) {
      console.log('token', token, error);
      throw new CustomInternalServerErrorException(error.message);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SigninResponseDto,
    description: '성공',
  })
  @ApiOperation({ summary: '로그인' })
  @ApiBody({
    type: SigninRequestDto,
    required: true,
    description: 'body',
  })
  @Post('')
  async signin(
    @Token() token: string,
    @ValidBody() body: SigninRequestDto,
  ): Promise<SigninResponseDto> {
    try {
      const { snsType } = body;
      let snsId, email;
      if (snsType === 'apple' || snsType === 'google') {
        const snsData = await this.SigninService.jwtDecode(token);
        snsId = snsData.sub;
        email = snsData.email;
      } else if (snsType === 'web') {
        const snsData = await this.SigninService.jwtOauth2(token);
        snsId = snsData.data.id;
        email = snsData.data.email;
      } else {
        throw new RequireBodyException();
      }
      if (!email || !snsId) {
        throw new ValidTokenException();
      }
      const user = await this.usersService.getUserBySnsIdAndSnsType({
        snsId,
        snsType,
      });
      const signUp = !user ? false : !!user.name ? true : false;
      const newUser = user
        ? user
        : await this.usersService.createUser({ snsId, snsType, email } as User);
      const {
        accessToken,
        refreshToken,
      } = await this.SigninService.createToken(newUser);
      return {
        status: HttpStatus.CREATED,
        data: { accessToken, refreshToken, signUp },
      };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message);
    }
  }
}
