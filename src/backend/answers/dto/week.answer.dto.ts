import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';

class WeekAnswer {
  @ApiProperty({
    example: '2020-09-01',
  })
  today: string;
  @ApiProperty({
    type: Answer,
    isArray: true,
  })
  answers: Answer[];
}

export class WeekAnswerDto extends ResponseDto {
  @ApiProperty({
    type: WeekAnswer,
  })
  data: WeekAnswer;
}
