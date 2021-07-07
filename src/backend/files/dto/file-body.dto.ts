import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FileBodyDto {
  @ApiProperty({
    example: '1',
    description: '파츠 번호',
    required: false,
  })
  @IsString({ message: '올바른 값이 아닙니다.' })
  public part?: string;

  @ApiProperty({
    example: 'https://cdn.moti.company/J9smJXN7.pdf',
    description: '파츠 이미지 url',
    required: false,
  })
  @IsString({ message: '올바른 값이 아닙니다.' })
  public file?: string;
}
