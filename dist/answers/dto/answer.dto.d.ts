import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';
export declare class AnswerDto extends ResponseDto {
    data: Answer;
}
