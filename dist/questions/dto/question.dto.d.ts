import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Question } from 'src/backend/common/entity/Question.entity';
export declare class QuestionDto extends ResponseDto {
    data: Question;
}
