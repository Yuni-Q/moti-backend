import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { RequestDto } from './response.dto';

export class TokenDto extends RequestDto {
  @ApiProperty({
    example: HttpStatus.BAD_REQUEST,
    description: '상태 코드',
    required: true,
  })
  public status = HttpStatus.BAD_REQUEST;
  @ApiProperty({
    example: '토큰이 필요합니다.',
    description: '에러 메시지',
    required: true,
  })
  public message: string;
}
