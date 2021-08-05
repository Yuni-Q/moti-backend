import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import dayjs from 'dayjs';

import { Mission } from '../common/entity/Mission.entity';
import { User } from '../common/entity/User.entity';

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

    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('isNextDate() 다음 날 true 반환', () => {
    const givenDate = '2021-08-04';
    const givenUserRefreshDate = '2021-08-03';

    const isNextDate: boolean = service.isNextDate({ userRefreshDate: givenUserRefreshDate, date: givenDate });
    expect(isNextDate).toBeTruthy();
  });

  it('isNextDate() 같은 날 false 반환', () => {
    const givenDate = '2021-08-03';
    const givenUserRefreshDate = '2021-08-03';

    const isNextDate: boolean = service.isNextDate({ userRefreshDate: givenUserRefreshDate, date: givenDate });
    expect(isNextDate).toBeFalsy();
  });

  it('isNextDate() 이전 날 false 반환', () => {
    const givenDate = '2021-08-02';
    const givenUserRefreshDate = '2021-08-03';

    const isNextDate: boolean = service.isNextDate({ userRefreshDate: givenUserRefreshDate, date: givenDate });
    expect(isNextDate).toBeFalsy();
  });

  it('isOverInitializingTime() 초기 시각과 같을 때 true 반환', () => {
    const givenEqualInitializingTime = '05:00';

    const mockDate = new Date();
    mockDate.setHours(Number(givenEqualInitializingTime.split(':')[0]));
    mockDate.setMinutes(Number(givenEqualInitializingTime.split(':')[1]));

    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as string);

    const isOverInitializingTime: boolean = service.isOverInitializingTime();
    expect(isOverInitializingTime).toBeTruthy();
  });

  it('isOverInitializingTime() 초기 시각을 넘을 때 true 반환', () => {
    const givenMoreThanInitializingTime = '05:01';

    const mockDate = new Date();
    mockDate.setHours(Number(givenMoreThanInitializingTime.split(':')[0]));
    mockDate.setMinutes(Number(givenMoreThanInitializingTime.split(':')[1]));

    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as string);

    const isOverInitializingTime: boolean = service.isOverInitializingTime();
    expect(isOverInitializingTime).toBeTruthy();
  });

  it('isOverInitializingTime() 초기 시각 전일 때 false 반환', () => {
    const givenMoreThanInitializingTime = '04:59';

    const mockDate = new Date();
    mockDate.setHours(Number(givenMoreThanInitializingTime.split(':')[0]));
    mockDate.setMinutes(Number(givenMoreThanInitializingTime.split(':')[1]));

    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as string);

    const isOverInitializingTime: boolean = service.isOverInitializingTime();
    expect(isOverInitializingTime).toBeFalsy();
  });

  it('isRefresh() 초기 시각과 같을 때 true 반환', () => {
    const givenEqualInitializingTime = '05:00';

    const mockNextDate = new Date();

    mockNextDate.setUTCDate(mockNextDate.getUTCDate() + 1);
    mockNextDate.setHours(Number(givenEqualInitializingTime.split(':')[0]));
    mockNextDate.setMinutes(Number(givenEqualInitializingTime.split(':')[1]));

    const mockNextDateString = dayjs(mockNextDate).locale('ko').format('YYYY-MM-DD');

    const refreshDate = dayjs(new Date()).locale('ko').format('YYYY-MM-DD');

    jest.spyOn(global, 'Date').mockImplementation(() => mockNextDate as unknown as string);

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
      date: mockNextDateString,
    });
    expect(isOverInitializingTime).toBeTruthy();
  });

  it('isRefresh() 초기 시각보다 클 때 true 반환', () => {
    const givenEqualInitializingTime = '05:01';

    const mockNextDate = new Date();

    mockNextDate.setUTCDate(mockNextDate.getUTCDate() + 1);
    mockNextDate.setHours(Number(givenEqualInitializingTime.split(':')[0]));
    mockNextDate.setMinutes(Number(givenEqualInitializingTime.split(':')[1]));

    const mockNextDateString = dayjs(mockNextDate).locale('ko').format('YYYY-MM-DD');

    const refreshDate = dayjs(new Date()).locale('ko').format('YYYY-MM-DD');

    jest.spyOn(global, 'Date').mockImplementation(() => mockNextDate as unknown as string);

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
      date: mockNextDateString,
    });
    expect(isOverInitializingTime).toBeTruthy();
  });

  it('isRefresh() 초기 시각보다 작을 때 false 반환', () => {
    const givenEqualInitializingTime = '04:59';

    const mockNextDate = new Date();

    mockNextDate.setUTCDate(mockNextDate.getUTCDate() + 1);
    mockNextDate.setHours(Number(givenEqualInitializingTime.split(':')[0]));
    mockNextDate.setMinutes(Number(givenEqualInitializingTime.split(':')[1]));

    const mockNextDateString = dayjs(mockNextDate).locale('ko').format('YYYY-MM-DD');

    const refreshDate = dayjs(new Date()).locale('ko').format('YYYY-MM-DD');

    jest.spyOn(global, 'Date').mockImplementation(() => mockNextDate as unknown as string);

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
      date: mockNextDateString,
    });
    expect(isOverInitializingTime).toBeFalsy();
  });
});
