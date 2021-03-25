import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/common/entity/Answer.entity';
import { Mission } from 'src/common/entity/Mission.entity';
import { User } from 'src/common/entity/User.entity';
import { getDateString } from 'src/common/util/date';
import { Repository } from 'typeorm';
import { InvalidMissionIdDto } from './dto/invalid.mission.id.dto';
import { MissionBodyDto } from './dto/mission.body.dto';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
  ) {}
  async destroy(id: number): Promise<null> {
    try {
      const mission = await this.checkMission({ id });
      await this.missionRepository.remove(mission);
      return null;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, body: MissionBodyDto): Promise<Mission> {
    try {
      const mission = await this.checkMission({ id });
      const newMission = { ...mission, ...body };
      await this.missionRepository.save(newMission);
      const returnMission = await this.findOne(id);
      return returnMission;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkMission({ id }: { id: number }): Promise<Mission> {
    try {
      const mission = await this.findOne(id);
      if (!mission) {
        throw new HttpException(
          new InvalidMissionIdDto(),
          HttpStatus.BAD_REQUEST,
        );
      }
      return mission;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(body: MissionBodyDto): Promise<Mission> {
    try {
      const mission = await this.missionRepository.create({ ...body });
      const newMission = this.missionRepository.save(mission);
      return newMission;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Mission> {
    try {
      const mission = this.missionRepository.findOne({ where: { id } });
      return mission;
    } catch (error) {
      const mission = this.missionRepository.findOne({ where: { id } });
      return mission;
    }
  }

  hasRefresh(user: User) {
    const date = getDateString({});
    return !!user.refreshDate && user.refreshDate === date;
  }

  getOldMission(
    user: User,
  ): {
    missions: Mission[];
  } {
    const { mission } = user;
    return mission && JSON.parse(mission);
  }

  isRefresh(user: User) {
    const date = getDateString({});
    return !user.refreshDate || (!!user.refreshDate && user.refreshDate < date);
  }

  hasOldMissions(oldMission: any) {
    const date = getDateString({});
    return (
      !!oldMission && oldMission.date === date && oldMission.missions.length > 0
    );
  }

  async hasMissionInAnswer({ answer, date }: { answer: Answer; date: string }) {
    return (
      !!answer?.date &&
      !!answer?.mission &&
      !!answer?.mission.cycle &&
      !!answer?.mission.id &&
      getDateString({ date: answer.date, day: answer.mission.cycle }) >= date
    );
  }
  async getMissionsByNotInIdAndLimit({
    ids,
    limit = 3,
  }: {
    ids: number[];
    limit?: number;
  }) {
    // TODO : .orderBy('RAND()')가 아직 지원하지 않아서 createQueryBuilder 사용
    return this.missionRepository
      .createQueryBuilder('missions')
      .where(`id NOT IN (${ids.join(', ')})`)
      .orderBy('RAND()')
      .limit(limit)
      .getMany();
  }
}
