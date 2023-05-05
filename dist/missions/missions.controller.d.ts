import { AnswersService } from 'src/backend/answers/answers.service';
import { UsersService } from 'src/backend/users/users.service';
import { DeleteMissionDto } from './dto/delete-mission.dto';
import { MissionBodyDto } from './dto/mission-body.dto';
import { MissionDto } from './dto/mission.dto';
import { MissionsDto } from './dto/missions.dto';
import { MissionsService } from './missions.service';
export declare class MissionsController {
    private readonly missionsService;
    private readonly answersService;
    private readonly usersService;
    constructor(missionsService: MissionsService, answersService: AnswersService, usersService: UsersService);
    missions(userId: any): Promise<MissionsDto>;
    refresh(userId: any): Promise<MissionsDto>;
    mission(userId: any, id: any): Promise<MissionDto>;
    create(body: MissionBodyDto): Promise<MissionDto>;
    update(body: MissionBodyDto, id: any): Promise<MissionDto>;
    destroy(userId: any, id: any): Promise<DeleteMissionDto>;
    getNewMission({ oneYearAgo, date, userId }: {
        oneYearAgo: string;
        date: string;
        userId: number;
    }): Promise<import("../common/entity/Mission.entity").Mission[]>;
}
