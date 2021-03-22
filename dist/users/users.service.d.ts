import { Mission } from 'src/common/entity/Mission.entity';
import { User } from 'src/common/entity/User.entity';
import { Repository } from 'typeorm';
import { UserBodyDto } from './dto/user.body.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(body: User): Promise<User>;
    getAll(id?: string): Promise<User[]>;
    get(id: number): Promise<User>;
    getUserBySnsIdAndSnsType({ snsId, snsType, }: {
        snsId: string;
        snsType: string;
    }): Promise<User>;
    updateMyInfo(id: number, body: UserBodyDto | {
        refreshDate: null;
    }): Promise<User>;
    deleteUser(id: number): Promise<null>;
    checkUser(id: number): Promise<User>;
    setMissionsInUser({ missions, id, }: {
        id: number;
        missions: Mission[];
    }): Promise<{
        mission: string;
        id: number;
        birthday: string;
        email: string;
        name: string;
        gender: string;
        refreshDate: string;
        refreshToken: string;
        snsId: string;
        snsType: string;
        createdAt: Date;
        updatedAt: Date;
        answers: import("../common/entity/Answer.entity").Answer[];
    } & User>;
    setMissionsAndRefreshDateInUser({ id, missions, }: {
        id: number;
        missions: Mission[];
    }): Promise<{
        refreshDate: string;
        mission: string;
        id: number;
        birthday: string;
        email: string;
        name: string;
        gender: string;
        refreshToken: string;
        snsId: string;
        snsType: string;
        createdAt: Date;
        updatedAt: Date;
        answers: import("../common/entity/Answer.entity").Answer[];
    } & User>;
}
