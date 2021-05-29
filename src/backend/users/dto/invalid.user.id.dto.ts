import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';

const status = HttpStatus.BAD_REQUEST;
const message = '유저가 존재하지 않습니다.';

export class InvalidUserIdDto extends ResponseDto {
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