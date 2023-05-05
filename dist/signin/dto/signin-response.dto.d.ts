import { ResponseDto } from 'src/backend/common/dto/response.dto';
export declare class SigninResponseDto extends ResponseDto {
    status?: number;
    data: {
        accessToken: string;
        refreshToken: string;
        signUp: boolean;
    };
}
