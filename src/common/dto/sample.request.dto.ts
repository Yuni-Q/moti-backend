import { ApiProperty } from '@nestjs/swagger';

export class SampleRequestDto {
  @ApiProperty({
    example: 'hi',
    description: '인사',
    required: true,
  })
  public hi: string;
}
