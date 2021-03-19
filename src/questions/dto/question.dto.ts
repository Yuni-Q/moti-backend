import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Question } from 'src/common/entity/Question.entity';

export class QuestionDto extends ResponseDto {
  @ApiProperty({
    example: {
      id: 1,
      content: '나는 누구인가?',
      updatedAt: '2020-02-23T08:07:59.120Z',
      createdAt: '2020-02-23T08:07:59.120Z',
    },
    description: '질문',
    required: true,
  })
  public data: Question;
}
