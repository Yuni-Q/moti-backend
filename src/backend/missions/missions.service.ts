import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/backend/common/entity/Answer.entity';
import { Mission } from 'src/backend/common/entity/Mission.entity';
import { User } from 'src/backend/common/entity/User.entity';
import { getDateString } from 'src/backend/common/util/date';
import { Repository } from 'typeorm';

import { MissionBodyDto } from './dto/mission-body.dto';
import { InvalidMissionIdException } from './exception/invalid-mission-id.exception';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
  ) {}
  async deleteMission(body) {
    await this.missionRepository.remove(body);
  }

  async updateMission(body): Promise<Mission> {
    return this.missionRepository.save(body);
  }

  async checkMission({ id }: { id: number }): Promise<Mission> {
    const mission = await this.getMissionById({ id });
    if (!mission) {
      throw new InvalidMissionIdException();
    }
    return mission;
  }

  async createMission(body: MissionBodyDto): Promise<Mission> {
    const mission = await this.missionRepository.create({ ...body });
    const newMission = await this.missionRepository.save(mission);
    return newMission;
  }

  async getMissionById({ id }: { id: number }): Promise<Mission> {
    return this.missionRepository.findOne({ where: { id } });
  }

  hasRefresh({ user, date }: { user: User; date: string }) {
    return user?.refreshDate === date;
  }

  getOldMission({ mission }: { mission: string }): {
    date: string;
    missions: Mission[];
  } {
    return mission && JSON.parse(mission);
  }

  isRefresh({ user, date }: { user: User; date: string }): boolean {
    return !user.refreshDate || (!!user.refreshDate && user.refreshDate < date);
  }

  hasOldMissions({ mission, date }: { mission: { date: string; missions: Mission[] }; date: string }) {
    return mission?.date === date && mission?.missions?.length > 0;
  }

  async hasMissionInAnswer({ answer, date }: { answer: Answer; date: string }) {
    return (
      !!answer?.date &&
      !!answer?.mission?.cycle &&
      !!answer?.mission?.id &&
      getDateString({ date: answer.date, day: answer.mission.cycle }) >= date
    );
  }
  async getMissionsByNotInIdAndLimit({ ids, limit = 3 }: { ids: number[]; limit?: number }) {
    // TODO : .orderBy('RAND()')가 아직 지원하지 않아서 createQueryBuilder 사용
    return (
      this.missionRepository
        .createQueryBuilder('missions')
        // 과거 데이터가 없으면 에러...
        .where(`id NOT IN (${ids.length > 0 ? ids.join(', ') : 0})`)
        .orderBy(process.env.NODE_ENV !== 'test' ? 'RAND()' : 'RANDOM()')
        .limit(limit)
        .getMany()
    );
  }
}
