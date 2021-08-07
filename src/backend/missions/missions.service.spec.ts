import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Mission } from '../common/entity/Mission.entity';
import { User } from '../common/entity/User.entity';
import { getDateString } from '../common/util/date';

import { MissionsService } from './missions.service';

class MockMissionsRepository {}

describe('MissionsService', () => {
  let service: MissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MissionsService,
        {
          provide: getRepositoryToken(Mission),
          useClass: MockMissionsRepository,
        },
      ],
    }).compile();

    service = module.get<MissionsService>(MissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test.each([
    ['05:01', true],
    ['05:00', true],
    ['04:59', false],
  ])('isRefresh() 에서 현재 시각이 %s 일 때 %s 반환', (nowTime: string, expected: boolean) => {
    const currentDate = new Date();
    currentDate.setHours(8);
    currentDate.setMinutes(0);

    const nextDate = new Date();
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);
    nextDate.setHours(Number(nowTime.split(':')[0]));
    nextDate.setMinutes(Number(nowTime.split(':')[1]));

    const nextDateString = getDateString({ date: nextDate });
    const refreshDate = getDateString({ date: currentDate });

    const user: User = {
      refreshDate,
      id: 0,
      birthday: '',
      email: '',
      name: '',
      gender: '',
      refreshToken: '',
      snsId: '',
      snsType: '',
      profileUrl: '',
      createdAt: undefined,
      updatedAt: undefined,
      mission: '',
      answers: [],
    };

    const isOverInitializingTime: boolean = service.isRefresh({
      user,
      date: nextDateString,
    });
    expect(isOverInitializingTime).toBe(expected);
  });
});
