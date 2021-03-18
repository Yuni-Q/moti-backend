import { ApiProperty } from '@nestjs/swagger';

export class BodyDto {
  @ApiProperty({
    example: '모티',
    description: '이름',
    required: true,
  })
  public name: string;
  @ApiProperty({
    example: '2020-03-18',
    description: '생일',
    required: true,
  })
  public birthday: string;
  @ApiProperty({
    example: '남',
    description: '성별',
    required: true,
  })
  public gender: string;
}
