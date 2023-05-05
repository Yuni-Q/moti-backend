import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { File } from '../../common/entity/File.entity';
export declare class FilesDto extends ResponseDto {
    data: File[];
}
