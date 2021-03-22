import { AnswersService } from 'src/answers/answers.service';
import { UsersService } from 'src/users/users.service';
import { DeleteMissionDto } from './dto/delete.mission.dto';
import { MissionDto } from './dto/mission.dto';
import { MissionsDto } from './dto/missions.dto';
import { MissionsService } from './missions.service';
export declare class MissionsController {
    private readonly missionsService;
    private readonly answersService;
    private readonly usersService;
    constructor(missionsService: MissionsService, answersService: AnswersService, usersService: UsersService);
    missions({ id }: {
        id: any;
    }): Promise<MissionsDto>;
    refresh({ id }: {
        id: any;
    }): Promise<MissionsDto>;
    mission(user: any, id: any): Promise<MissionDto>;
    create(user: any, body: any): Promise<MissionDto>;
    update(user: any, body: any, id: any): Promise<MissionDto>;
    destroy(user: any, id: any): Promise<DeleteMissionDto>;
    getNewMission(userId: number): Promise<import("../common/entity/Mission.entity").Mission[]>;
}
