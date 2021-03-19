import { Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequireTokenDto } from 'src/common/dto/require.token.dto';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { Token } from './decorators/token.decorator';
import { ValidBody } from './decorators/valid.body';
import { SigninRequestDto } from './dto/signin.request.dto';
import { SigninResponseDto } from './dto/signin.response.dto';
import { SigninService } from './signin.service';

@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('authorization')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  type: RequireTokenDto,
  description: '토큰이 없습니다.',
})
@ApiTags('signin')
@Controller('signin')
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
