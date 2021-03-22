import { BaseEntity } from 'typeorm';
import { Answer } from './Answer.entity';
export declare class Mission extends BaseEntity {
    id: number;
    title: string | null;
    isContent: boolean | null;
    isImage: boolean | null;
    cycle: number | null;
    createdAt: Date;
    updatedAt: Date;
    answers: Answer[];
}
