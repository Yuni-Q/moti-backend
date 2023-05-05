import { Answer } from './Answer.entity';
export declare class Mission {
    id: number;
    title: string | null;
    isContent: boolean | null;
    isImage: boolean | null;
    cycle: number | null;
    createdAt: Date;
    updatedAt: Date;
    answers: Answer[];
}
declare const OmitMission_base: import("@nestjs/common").Type<Omit<Mission, "answers">>;
export declare class OmitMission extends OmitMission_base {
}
export {};
