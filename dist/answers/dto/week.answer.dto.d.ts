import { ResponseDto } from 'src/common/dto/response.dto';
import { Answer } from 'src/common/entity/Answer.entity';
export declare class WeekAnswerDto extends ResponseDto {
    data: {
        today: string;
        answers: Answer[];
    };
}
