import { UsersService } from 'src/users/users.service';
import { SigninResponseDto } from './dto/signin.response.dto';
export declare class SigninService {
    private readonly usersService;
    constructor(usersService: UsersService);
    signin(token: string, snsType: string): Promise<SigninResponseDto['data']>;
    refresh(token: string): Promise<SigninResponseDto['data']>;
    createToken({ id, snsId, snsType, }: {
        id: number;
        snsId: string;
        snsType: string;
    }): Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
}
