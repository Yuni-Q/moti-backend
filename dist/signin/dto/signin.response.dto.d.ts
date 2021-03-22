import { ResponseDto } from 'src/common/dto/response.dto';
export declare class SigninResponseDto extends ResponseDto {
    status?: number;
    data: {
        accessToken: string;
        refreshToken: string;
        signUp: boolean;
    };
}
