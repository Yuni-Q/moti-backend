import { Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequireTokenException } from 'src/common/exception/require.token.exception';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { Token } from './decorators/token.decorator';
import { ValidBody } from './decorators/valid.body';
import { SigninRequestDto } from './dto/signin.request.dto';
import { SigninResponseDto } from './dto/signin.response.dto';
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
  constructor(private readonly SigninService: SigninService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SigninResponseDto,
    description: '성공',
  })
  @ApiOperation({ summary: 'refresh token으로 로그인' })
  @Post('refresh')
  async refresh(@Token() token: string): Promise<SigninResponseDto> {
    const result = await this.SigninService.refresh(token);
    return { status: HttpStatus.CREATED, data: result };
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
    const result = await this.SigninService.signin(token, body.snsType);
    return { status: HttpStatus.CREATED, data: result };
  }
}
