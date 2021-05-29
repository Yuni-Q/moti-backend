import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';

class DiaryAnswers {
  @ApiProperty({
    example: '2021-01-18',
  })
  date: string;
  @ApiProperty({
    example: 0,
  })
  direction: 0;
  @ApiProperty({
    example: 10,
  })
  limit: 10;
  @ApiProperty({ type: Answer, isArray: true })
  answers: Answer[];
}

export class DiaryAnswersDto extends ResponseDto {
  @ApiProperty({ type: DiaryAnswers })
  data: {
    date: string;
    limit: number;
    direction: number;
    answers: Answer[];
  };
}
