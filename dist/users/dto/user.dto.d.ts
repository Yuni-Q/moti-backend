import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { User } from 'src/backend/common/entity/User.entity';
export declare class UserDto extends ResponseDto {
    data: User;
}
