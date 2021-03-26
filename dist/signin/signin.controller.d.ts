import { UsersService } from 'src/users/users.service';
import { SigninRequestDto } from './dto/signin.request.dto';
import { SigninResponseDto } from './dto/signin.response.dto';
import { SigninService } from './signin.service';
export declare class SigninController {
    private readonly SigninService;
    private readonly usersService;
    constructor(SigninService: SigninService, usersService: UsersService);
    refresh(token: string): Promise<SigninResponseDto>;
    signin(token: string, body: SigninRequestDto): Promise<SigninResponseDto>;
}
