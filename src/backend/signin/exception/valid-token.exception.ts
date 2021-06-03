import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const status = HttpStatus.PRECONDITION_FAILED;
const message = '토큰에 필수 정보가 없습니다.';

export class ValidTokenException extends HttpException {
  @ApiProperty({
    example: status,
    description: '상태 코드',
    required: true,
  })
  public statusCode = status;

  @ApiProperty({
    example: message,
    description: '에러 메시지',
    required: true,
  })
  public message = message;

  constructor() {
    // TODO : status 제거
    super({ status, statusCode: status, message }, status);
  }
}
