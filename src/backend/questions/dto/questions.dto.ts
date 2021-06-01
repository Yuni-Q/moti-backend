import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Question } from 'src/backend/common/entity/Question.entity';

class Questions {
  @ApiProperty({
    example: 52,
    description: '질문의 총 갯수 입니다.',
  })
  questionTotalCount: number;
  @ApiProperty({
    type: Question,
    isArray: true,
  })
  questions: Question[];
}

export class QuestionsDto extends ResponseDto {
  @ApiProperty({
    type: Questions,
  })
  public data: Questions;
}
