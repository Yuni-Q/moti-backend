import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const status = HttpStatus.BAD_REQUEST;
const message = '갱신 횟수가 모자랍니다.';

export class InsufficientRefreshCountException extends HttpException {
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
    super(
      // TODO : status 제거
      { status, statusCode: status, message },
      status,
    );
  }
}
