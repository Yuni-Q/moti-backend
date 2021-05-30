import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';

export class SigninResponseDto extends ResponseDto {
  @ApiProperty({
    example: HttpStatus.OK,
    description: '상태 코드',
    required: true,
  })
  public status?: number;

  @ApiProperty({
    example: {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      signUp: false,
    },
    description: '에러 메시지',
    required: true,
  })
  public data: {
    accessToken: string;
    refreshToken: string;
    signUp: boolean;
  };
}
