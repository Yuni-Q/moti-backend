import { Test, TestingModule } from '@nestjs/testing';

import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';

class MockViewsService {}

describe('ViewsController', () => {
  let controller: ViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewsController],
      providers: [
        {
          provide: ViewsService,
          useClass: MockViewsService,
        },
      ],
    }).compile();

    controller = module.get<ViewsController>(ViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
