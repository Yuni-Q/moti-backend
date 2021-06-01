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
  direction: number;
  @ApiProperty({
    example: 10,
  })
  limit: number;
  @ApiProperty({ type: Answer, isArray: true })
  answers: Answer[];
}

export class DiaryAnswersDto extends ResponseDto {
  @ApiProperty({ type: DiaryAnswers })
  data: DiaryAnswers;
}
