import { Answer } from './Answer.entity';
export declare class File {
    id: number;
    cardUrl: string | null;
    cardSvgUrl: string | null;
    cardPngUrl: string | null;
    cardPdfUrl: string | null;
    part: number | null;
    createdAt: Date;
    updatedAt: Date;
    answers: Answer[];
}
declare const OmitFile_base: import("@nestjs/common").Type<Omit<File, "answers">>;
export declare class OmitFile extends OmitFile_base {
}
export {};
