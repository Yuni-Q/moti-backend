import { ResponseDto } from 'src/backend/common/dto/response.dto';
export declare class DeleteAnswerDto extends ResponseDto {
    status?: number;
    message?: string;
    data: any;
}
