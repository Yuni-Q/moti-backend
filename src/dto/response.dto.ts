import { ApiProperty } from '@nestjs/swagger';

export class RequestDto {
  @ApiProperty({
    example: '200',
    description: '상태 코드',
    required: true,
  })
  public status: string;
  @ApiProperty({
    example: '',
    description: '에러 메시지',
    required: true,
  })
  public error: string;
}
