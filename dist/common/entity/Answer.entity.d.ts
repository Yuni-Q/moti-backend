import { File } from './File.entity';
import { Mission } from './Mission.entity';
import { User } from './User.entity';
export declare class Answer {
    id: number;
    imageUrl: string | null;
    content: string | null;
    date: string | null;
    setDate: string | null;
    no: number | null;
    createdAt: Date;
    updatedAt: Date;
    missionId: number | null;
    fileId: number | null;
    userId: number | null;
    mission: Mission;
    file: File;
    user: User;
}
