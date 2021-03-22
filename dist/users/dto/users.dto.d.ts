import { ResponseDto } from 'src/common/dto/response.dto';
import { User } from 'src/common/entity/User.entity';
export declare class UsersDto extends ResponseDto {
    data: User[];
}
