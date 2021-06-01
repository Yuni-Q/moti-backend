import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Question } from 'src/backend/common/entity/Question.entity';

export class QuestionDto extends ResponseDto {
  @ApiProperty({
    type: Question,
  })
  public data: Question;
}
