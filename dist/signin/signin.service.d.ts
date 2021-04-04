export declare class SigninService {
    jwtOauth2(token: string): Promise<{
        data: {
            id: string;
            email: string;
        };
    }>;
    jwtDecode(token: string): Promise<{
        sub: string;
        email: string;
    }>;
    createToken({ id, snsId, snsType, }: {
        id: number;
        snsId: string;
        snsType: string;
    }): Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
}
