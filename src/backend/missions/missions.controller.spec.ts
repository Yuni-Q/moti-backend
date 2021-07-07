import { Test, TestingModule } from '@nestjs/testing';

import { MockAnswersService } from '../answers/answers.controller.spec';
import { AnswersService } from '../answers/answers.service';
import { MockFilesService } from '../files/files.controller.spec';
import { FilesService } from '../files/files.service';
import { MockUsersService } from '../users/users.controller.spec';
import { UsersService } from '../users/users.service';

import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';

export class MockMissionsService {}

describe('MissionsController', () => {
  let controller: MissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionsController],
      providers: [
        {
          provide: MissionsService,
          useClass: MockMissionsService,
        },
        {
          provide: AnswersService,
          useClass: MockAnswersService,
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

    controller = module.get<MissionsController>(MissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
