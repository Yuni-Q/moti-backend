import { User } from 'src/backend/common/entity/User.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(body: User): Promise<User>;
    getAll(id: number): Promise<User[]>;
    getUserById({ id }: {
        id: number;
    }): Promise<User>;
    getUserBySnsIdAndSnsType({ snsId, snsType }: {
        snsId: string;
        snsType: string;
    }): Promise<User>;
    updateMyInfo(body: any): Promise<User>;
    deleteUser(user: User): Promise<User>;
    checkUser({ id }: {
        id: number;
    }): Promise<User>;
    updateUser(body: any): Promise<User>;
}
