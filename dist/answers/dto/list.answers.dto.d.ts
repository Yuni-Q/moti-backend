import { ResponseDto } from 'src/common/dto/response.dto';
import { Answer } from 'src/common/entity/Answer.entity';
export declare class ListAnswersDto extends ResponseDto {
    data: Answer[][];
}
