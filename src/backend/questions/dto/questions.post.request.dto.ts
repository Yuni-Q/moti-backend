import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QuestionsPostRequestDto {
  @ApiProperty({
    example: '너의 질문은?',
    description: '질문 내용을 작성해 주세요.',
    required: true,
  })
  @IsString({ message: '필수 파라이터가 없습니다.' })
  @IsNotEmpty({ message: '필수 파라이터가 없습니다.' })
  public content: string;
}
