import { BaseEntity } from 'typeorm';
export declare class Question extends BaseEntity {
    id: number;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
}
