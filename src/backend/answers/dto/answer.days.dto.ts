import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';

export class AnswerDaysDto extends ResponseDto {
  @ApiProperty({
    example: ['2021-04-14', '2021-04-18'],
    description: '답변 일자 조회',
    required: true,
  })
  data: string[];
}
