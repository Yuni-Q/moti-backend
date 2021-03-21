import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswersService } from 'src/answers/answers.service';
import { Answer } from 'src/common/entity/Answer.entity';
import { Mission } from 'src/common/entity/Mission.entity';
import { User } from 'src/common/entity/User.entity';
import { getDateString } from 'src/common/util/date';
import { UsersService } from 'src/users/users.service';
import { In, Raw, Not, Repository } from 'typeorm';
import { MissionBodyDto } from './dto/mission.body.dto';
import { InsufficientRefreshCount } from './dto/insufficient.refresh.count.dto';
import { InvalidMissionIdDto } from './dto/invalid.mission.id.dto';
import { MissionsDto } from './dto/missions.dto';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
    private readonly answersService: AnswersService,
    private readonly usersService: UsersService,
  ) {}

  async update(id: number, body: MissionBodyDto): Promise<Mission> {
    const mission = await this.checkMission(id);
    console.log(11, mission);
    const newMission = { ...mission, ...body };
    console.log(22, newMission);
    await this.missionRepository.save(newMission);
    const returnMission = await this.findOne(id);
    return returnMission;
  }

  async checkMission(id: number): Promise<Mission> {
    const mission = await this.findOne(id);
    if (!mission) {
      throw new HttpException(
        new InvalidMissionIdDto(),
        HttpStatus.BAD_REQUEST,
      );
    }
    return mission;
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

  async refresh(id: number): Promise<MissionsDto['data']> {
    try {
      const user = await this.usersService.checkUser(id);
      if (this.hasRefresh(user)) {
        throw new HttpException(
          new InsufficientRefreshCount(),
          HttpStatus.BAD_REQUEST,
        );
      }
      const missions = await this.getNewMission(id);
      await this.usersService.setMissionsAndRefreshDateInUser({
        missions,
        id: id,
      });
      return { refresh: false, missions };
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

  hasRefresh(user: User) {
    const date = getDateString({});
    return !!user.refreshDate && user.refreshDate === date;
  }

  async getAll(id: number): Promise<MissionsDto['data']> {
    try {
      const user = await this.usersService.checkUser(id);
      const oldMission = this.getOldMission(user);
      const refresh = this.isRefresh(user);
      if (this.hasOldMissions(oldMission)) {
        return { refresh, missions: oldMission.missions };
      }
      const missions = await this.getNewMission(id);
      await this.usersService.setMissionsInUser({ missions, id: id });
      return { refresh, missions };
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

  async getNewMission(userId: number) {
    const date = getDateString({});
    const oneYearAgo = getDateString({ years: -1 });
    const oneYearData = await this.answersService.getAnswersByUserIdAndDateRange(
      {
        userId,
        dateGt: oneYearAgo,
      },
    );
    const ids = [] as number[];
    oneYearData.forEach((answer: Answer) => {
      if (this.hasMissionInAnswer({ answer, date })) {
        ids.push(answer.mission.id);
      }
    });
    const missions = this.getMissionsByNotInIdAndLimit({ ids });
    return missions;
  }

  async hasMissionInAnswer({ answer, date }: { answer: Answer; date: string }) {
    return (
      !!answer &&
      !!answer.date &&
      answer.mission &&
      answer.mission.cycle &&
      answer.mission.id &&
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
