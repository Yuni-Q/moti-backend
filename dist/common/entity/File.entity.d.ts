import { BaseEntity } from 'typeorm';
import { Answer } from './Answer.entity';
export declare class File extends BaseEntity {
    id: number;
    cardUrl: string | null;
    part: number | null;
    createdAt: Date;
    updatedAt: Date;
    cardSvgUrl: string | null;
    cardPngUrl: string | null;
    answers: Answer[];
}
