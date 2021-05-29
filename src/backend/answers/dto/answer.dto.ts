import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';

export class AnswerDto extends ResponseDto {
  @ApiProperty({ type: Answer })
  data: Answer;
}
