import { Answer } from 'src/common/entity/Answer.entity';
import { Mission } from 'src/common/entity/Mission.entity';
import { User } from 'src/common/entity/User.entity';
import { Repository } from 'typeorm';
import { MissionBodyDto } from './dto/mission.body.dto';
export declare class MissionsService {
    private missionRepository;
    constructor(missionRepository: Repository<Mission>);
    deleteMission(body: any): Promise<void>;
    updateMission(body: any): Promise<Mission>;
    checkMission({ id }: {
        id: number;
    }): Promise<Mission>;
    createMission(body: MissionBodyDto): Promise<Mission>;
    getMissionById({ id }: {
        id: number;
    }): Promise<Mission>;
    hasRefresh({ user, date }: {
        user: User;
        date: string;
    }): boolean;
    getOldMission({ mission, }: {
        mission: string;
    }): {
        date: string;
        missions: Mission[];
    };
    isRefresh({ user, date }: {
        user: User;
        date: string;
    }): boolean;
    hasOldMissions({ mission, date, }: {
        mission: {
            date: string;
            missions: Mission[];
        };
        date: string;
    }): boolean;
    hasMissionInAnswer({ answer, date }: {
        answer: Answer;
        date: string;
    }): Promise<boolean>;
    getMissionsByNotInIdAndLimit({ ids, limit, }: {
        ids: number[];
        limit?: number;
    }): Promise<Mission[]>;
}
