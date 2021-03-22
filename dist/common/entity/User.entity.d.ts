import { BaseEntity } from 'typeorm';
import { Answer } from './Answer.entity';
export declare class User extends BaseEntity {
    id: number;
    birthday: string | null;
    email: string | null;
    name: string | null;
    gender: string | null;
    refreshDate: string | null;
    refreshToken: string | null;
    mission: string | null;
    snsId: string | null;
    snsType: string | null;
    createdAt: Date;
    updatedAt: Date;
    answers: Answer[];
}
