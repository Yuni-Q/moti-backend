import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const status = HttpStatus.BAD_REQUEST;
const message = '수정할 수 있는 시각이 지났습니다.';

export class TimeoutAnswerUpdateException extends HttpException {
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
    super({ status, statusCode: status, message }, status);
  }
}
