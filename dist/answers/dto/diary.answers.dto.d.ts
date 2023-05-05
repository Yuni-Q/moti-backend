import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';
declare class DiaryAnswers {
    date: string;
    direction: number;
    limit: number;
    answers: Answer[];
}
export declare class DiaryAnswersDto extends ResponseDto {
    data: DiaryAnswers;
}
export {};
