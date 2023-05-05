import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { OmitUser } from 'src/backend/common/entity/User.entity';
export declare class UsersDto extends ResponseDto {
    data: OmitUser[];
}
