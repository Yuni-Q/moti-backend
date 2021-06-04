import { Test, TestingModule } from '@nestjs/testing';
import { MockUsersService } from '../users/users.controller.spec';
import { UsersService } from '../users/users.service';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';

class MockSigninService {}

describe('SigninController', () => {
  let controller: SigninController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SigninController],
      providers: [
        {
          provide: SigninService,
          useClass: MockSigninService,
        },
        {
          provide: UsersService,
          useClass: MockUsersService,
        },
      ],
    }).compile();

    controller = module.get<SigninController>(SigninController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
