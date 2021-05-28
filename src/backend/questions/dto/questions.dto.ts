import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Question } from 'src/backend/common/entity/Question.entity';

export class QuestionsDto extends ResponseDto {
  @ApiProperty({
    example: {
      questions: [
        {
          id: 1,
          content: '오늘 하루 감사한 일을 알려주세요.',
          createdAt: '2021-01-24T10:15:30.000Z',
          updatedAt: '2021-01-24T10:15:30.000Z',
        },
      ],
      questionTotalCount: 52,
    },
    description: '질문',
    required: true,
  })
  public data: { questions: Question[]; questionTotalCount: number };
}
