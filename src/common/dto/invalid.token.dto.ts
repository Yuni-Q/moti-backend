import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from './response.dto';

const status = 1100;
const message = '올바르지 못한 토큰 입니다.';

export class InvalidTokenDto extends ResponseDto {
  @ApiProperty({
    example: status,
    description: '상태 코드',
    required: true,
  })
  public status = status;

  @ApiProperty({
    example: message,
    description: '에러 메시지',
    required: true,
  })
  public message = message;
}
