import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const status = HttpStatus.INTERNAL_SERVER_ERROR;

export class CustomInternalServerErrorException extends HttpException {
  @ApiProperty({
    example: status,
    description: '상태 코드',
    required: true,
  })
  public statusCode = status;

  @ApiProperty({
    example: '알 수 없는 에러가 발생했습니다.',
    description: '에러 메시지',
    required: true,
  })
  public message;

  constructor(message) {
    // TODO : status 제거
    super({ status, statusCode: status, message }, status);
  }
}
