import { ResponseDto } from 'src/common/dto/response.dto';
import { Question } from 'src/common/entity/Question.entity';
export declare class QuestionsDto extends ResponseDto {
    data: {
        questions: Question[];
        questionTotalCount: number;
    };
}
