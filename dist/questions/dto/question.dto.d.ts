import { ResponseDto } from 'src/common/dto/response.dto';
import { Question } from 'src/common/entity/Question.entity';
export declare class QuestionDto extends ResponseDto {
    data: Question;
}
