import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';

class MonthAnswers {
  @ApiProperty({
    example: '2020-09-01',
  })
  date: string;
  @ApiProperty({
    type: 'array',
    items: {
      type: 'array',
      items: {
        $ref: getSchemaPath(Answer),
      },
    },
  })
  monthAnswer: Answer[][];
}

export class MonthAnswersDto extends ResponseDto {
  @ApiProperty({
    type: MonthAnswers,
  })
  data: MonthAnswers;
}
