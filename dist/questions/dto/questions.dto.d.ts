import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Question } from 'src/backend/common/entity/Question.entity';
declare class Questions {
    questionTotalCount: number;
    questions: Question[];
}
export declare class QuestionsDto extends ResponseDto {
    data: Questions;
}
export {};
