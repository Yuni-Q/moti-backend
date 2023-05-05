import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';
declare class WeekAnswer {
    today: string;
    answers: Answer[];
}
export declare class WeekAnswerDto extends ResponseDto {
    data: WeekAnswer;
}
export {};
