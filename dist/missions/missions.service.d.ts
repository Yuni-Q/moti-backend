import { Answer } from 'src/common/entity/Answer.entity';
import { Mission } from 'src/common/entity/Mission.entity';
import { User } from 'src/common/entity/User.entity';
import { Repository } from 'typeorm';
import { MissionBodyDto } from './dto/mission.body.dto';
export declare class MissionsService {
    private missionRepository;
    constructor(missionRepository: Repository<Mission>);
    destroy(id: number): Promise<null>;
    update(id: number, body: MissionBodyDto): Promise<Mission>;
    checkMission(id: number): Promise<Mission>;
    create(body: MissionBodyDto): Promise<Mission>;
    findOne(id: number): Promise<Mission>;
    hasRefresh(user: User): boolean;
    getOldMission(user: User): {
        missions: Mission[];
    };
    isRefresh(user: User): boolean;
    hasOldMissions(oldMission: any): boolean;
    hasMissionInAnswer({ answer, date }: {
        answer: Answer;
        date: string;
    }): Promise<boolean>;
    getMissionsByNotInIdAndLimit({ ids, limit, }: {
        ids: number[];
        limit?: number;
    }): Promise<Mission[]>;
}
