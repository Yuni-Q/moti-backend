import {
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Token } from './decorators/token.decorator';
import { RequireTokenDto } from 'src/common/dto/require.token.dto';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { SigninService } from './signin.service';
import { ValidBody } from './decorators/valid.body';
import { SigninResponseDto } from './dto/signin.response.dto';
import { SigninRequestDto } from './dto/signin.request.dto';

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
    status: HttpStatus.OK,
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
    return { status: 201, data: result };
  }
}
