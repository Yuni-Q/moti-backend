import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mission } from '../common/entity/Mission.entity';
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
});
