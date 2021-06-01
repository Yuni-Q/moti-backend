import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';

export class ListAnswersDto extends ResponseDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'array',
      items: {
        $ref: getSchemaPath(Answer),
      },
    },
  })
  data: Answer[][];
}
