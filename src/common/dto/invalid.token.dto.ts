import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { RequestDto } from './response.dto';

export class InvalidTokenDto extends RequestDto {
  @ApiProperty({
    example: 1100,
    description: '상태 코드',
    required: true,
  })
  public status = 1100;

  @ApiProperty({
    example: '올바르지 못한 토큰 입니다.',
    description: '에러 메시지',
    required: true,
  })
  public message = '올바르지 못한 토큰 입니다.';
}
