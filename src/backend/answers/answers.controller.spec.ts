import { Test, TestingModule } from '@nestjs/testing';

import { MockFilesService } from '../files/files.controller.spec';
import { FilesService } from '../files/files.service';
import { MockMissionsService } from '../missions/missions.controller.spec';
import { MissionsService } from '../missions/missions.service';
import { MockUsersService } from '../users/users.controller.spec';
import { UsersService } from '../users/users.service';

import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

export class MockAnswersService {}

describe('AnswersController', () => {
  let controller: AnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [
        {
          provide: AnswersService,
          useClass: MockAnswersService,
        },
        {
          provide: MissionsService,
          useClass: MockMissionsService,
        },
        {
          provide: FilesService,
          useClass: MockFilesService,
        },
        {
          provide: UsersService,
          useClass: MockUsersService,
        },
      ],
    }).compile();

    controller = module.get<AnswersController>(AnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
