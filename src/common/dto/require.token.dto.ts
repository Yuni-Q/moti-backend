import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from './response.dto';

const status = HttpStatus.BAD_REQUEST;
const message = '토큰이 필요합니다.';
export class RequireTokenDto extends ResponseDto {
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
