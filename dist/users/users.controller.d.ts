import { User } from 'src/common/entity/User.entity';
import { DeleteUserDto } from './dto/delete.user.dto';
import { UserBodyDto } from './dto/user.body.dto';
import { UserDto } from './dto/user.dto';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(userId: User, idString: string): Promise<UsersDto>;
    getMyInfo(userId: any): Promise<UserDto>;
    getUserInfo(userId: User, id: number): Promise<UserDto>;
    updateUser(userId: any, body: UserBodyDto): Promise<UserDto>;
    resetRefreshDate(userId: any): Promise<UserDto>;
    deleteUser(userId: any): Promise<DeleteUserDto>;
}
