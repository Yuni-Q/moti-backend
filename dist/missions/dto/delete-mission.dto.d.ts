import { ResponseDto } from 'src/backend/common/dto/response.dto';
export declare class DeleteMissionDto extends ResponseDto {
    status?: number;
    message?: string;
    data: any;
}
