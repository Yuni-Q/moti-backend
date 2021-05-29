import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';

export class AnswersDto extends ResponseDto {
  @ApiProperty({
    type: Answer,
    isArray: true,
    description: '답변 조회',
  })
  data: Answer[];
}
