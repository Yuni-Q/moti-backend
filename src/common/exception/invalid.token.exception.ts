import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const status = HttpStatus.BAD_REQUEST;
const statusCode = 1100;
const message = '올바르지 못한 토큰 입니다.';

export class InvalidTokenException extends HttpException {
  @ApiProperty({
    example: status,
    description: '상태 코드',
    required: true,
  })
  public statusCode = statusCode;

  @ApiProperty({
    example: message,
    description: '에러 메시지',
    required: true,
  })
  public message = message;

  constructor() {
    // TODO : status 제거
    super({ status, statusCode, message }, status);
  }
}
