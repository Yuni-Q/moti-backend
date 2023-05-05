import { Answer } from './Answer.entity';
export declare class User {
    id: number;
    birthday: string | null;
    email: string | null;
    name: string | null;
    gender: string | null;
    refreshDate: string | null;
    refreshToken: string | null;
    snsId: string | null;
    snsType: string | null;
    profileUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    mission: string | null;
    answers: Answer[];
}
declare const OmitUser_base: import("@nestjs/common").Type<Omit<User, "answers">>;
export declare class OmitUser extends OmitUser_base {
}
export {};
