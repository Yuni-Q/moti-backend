import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';
declare class MonthAnswers {
    date: string;
    monthAnswer: Answer[][];
}
export declare class MonthAnswersDto extends ResponseDto {
    data: MonthAnswers;
}
export {};
