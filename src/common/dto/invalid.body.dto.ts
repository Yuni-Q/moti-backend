import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { RequestDto } from './response.dto';

export class InvalidBodyDto extends RequestDto {
  @ApiProperty({
    example: HttpStatus.PRECONDITION_FAILED,
    description: '상태 코드',
    required: true,
  })
  public status = HttpStatus.PRECONDITION_FAILED;

  @ApiProperty({
    example: '필수 파라이터가 없습니다.',
    description: '에러 메시지',
    required: true,
  })
  public message = '필수 파라이터가 없습니다.';
}
