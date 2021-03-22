import { ResponseDto } from 'src/common/dto/response.dto';
import { Answer } from 'src/common/entity/Answer.entity';
export declare class MonthAnswersDto extends ResponseDto {
    data: {
        date: string;
        monthAnswer: Answer[][];
    };
}
