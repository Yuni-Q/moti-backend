import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';

const status = HttpStatus.OK;
const message = '유저를 삭제 했습니다.';
const data = null;

export class DeleteUserDto extends ResponseDto {
  @ApiProperty({
    example: status,
    description: '상태 코드',
    required: true,
  })
  public status?: number = status;

  @ApiProperty({
    example: message,
    description: '에러 메시지',
    required: true,
  })
  public message? = message;

  @ApiProperty({
    example: data,
    description: 'null을 return 합니다.',
    required: true,
  })
  public data = data;
}
