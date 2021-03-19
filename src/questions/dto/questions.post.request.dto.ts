import { ApiProperty } from '@nestjs/swagger';

export class QuestionsPostRequestDto {
  @ApiProperty({
    example: '너의 질문은?',
    description: '질문 내용을 작성해 주세요.',
    required: true,
  })
  public content: string;
}
