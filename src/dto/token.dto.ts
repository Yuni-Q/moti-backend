import { ApiProperty } from '@nestjs/swagger';
import { RequestDto } from './response.dto';

export class TokenDto extends RequestDto {
  @ApiProperty({
    example: '400',
    description: '상태 코드',
    required: true,
  })
  public status: string;
  @ApiProperty({
    example: '토큰이 필요합니다.',
    description: '에러 메시지',
    required: true,
  })
  public error: string;
}
