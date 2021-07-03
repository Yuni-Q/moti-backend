import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MissionBodyDto {
  @ApiProperty({
    example: '질문 제목',
    description: '질문 제목',
    required: true,
  })
  @IsString({ message: '필수 파라이터가 없습니다.' })
  @IsNotEmpty({ message: '필수 파라이터가 없습니다.' })
  public title: string;

  @ApiProperty({
    example: true,
    description: '글 포함 유무',
    required: true,
  })
  @IsBoolean({ message: '필수 파라이터가 없습니다.' })
  @IsNotEmpty({ message: '필수 파라이터가 없습니다.' })
  public isContent: boolean;

  @ApiProperty({
    example: false,
    description: '이미지 포함 유무',
    required: true,
  })
  @IsBoolean({ message: '필수 파라이터가 없습니다.' })
  @IsNotEmpty({ message: '필수 파라이터가 없습니다.' })
  public isImage: boolean;

  @ApiProperty({
    example: 30,
    description: '질문 다시 묻지 않을 기간',
    required: true,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '필수 파라이터가 없습니다.' })
  @IsNotEmpty({ message: '필수 파라이터가 없습니다.' })
  public cycle: number;
}
