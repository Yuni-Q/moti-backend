import { User } from 'src/common/entity/User.entity';
import { UserBodyDto } from './dto/user.body.dto';
import { DeleteUserDto } from './dto/delete.user.dto';
import { UserDto } from './dto/user.dto';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(user: User, id: string): Promise<UsersDto>;
    getMyInfo(user: User): Promise<UserDto>;
    getUserInfo(user: User, id: number): Promise<UserDto>;
    updateUser(user: User, body: UserBodyDto): Promise<UserDto>;
    resetRefreshDate(user: User): Promise<UserDto>;
    deleteUser(user: User): Promise<DeleteUserDto>;
}
