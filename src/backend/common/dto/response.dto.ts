import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    example: HttpStatus.OK,
    description: 'http 상태 코드',
    required: true,
  })
  public status?: number;

  @ApiProperty({
    example: HttpStatus.OK,
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
