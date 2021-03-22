import { ResponseDto } from 'src/common/dto/response.dto';
import { Answer } from 'src/common/entity/Answer.entity';
export declare class DiaryAnswersDto extends ResponseDto {
    data: {
        lastId: number;
        limit: number;
        direction: number;
        answers: Answer[];
    };
}
