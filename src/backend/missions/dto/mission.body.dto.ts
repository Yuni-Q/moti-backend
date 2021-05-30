import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MissionBodyDto {
  @ApiProperty({
    example: '질문 제목',
    description: '질문 제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: '글 포함 유무',
    required: true,
  })
  public isContent: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: false,
    description: '이미지 포함 유무',
    required: true,
  })
  public isImage: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 30,
    description: '질문 다시 묻지 않을 기간',
    required: true,
  })
  public cycle: number;
}
