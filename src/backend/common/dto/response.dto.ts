import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const status = HttpStatus.OK;

export class ResponseDto {
  @ApiProperty({
    example: status,
    description: 'http 상태 코드',
    required: true,
  })
  public status?: number;

  @ApiProperty({
    example: status,
    description: 'custom 상태 코드',
    required: true,
  })
  public statusCode?: number;

  @ApiProperty({
    example: '',
    description: '에러 메시지',
    required: true,
  })
  public message? = '';
}
