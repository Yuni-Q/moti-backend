import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../common/entity/User.entity';

import { UsersService } from './users.service';

class MockUserRepository {
  #data = [
    {
      id: 1,
      email: 'yuni@gmail.com',
    },
    {
      id: 2,
      email: 'moti@gmail.com',
    },
  ];
  find(id) {
    const data = this.#data.filter((v) => {
      return v.id >= id.where.id._value;
    });
    return data;
  }
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // 실제와 목킹이 같으면 간소화가 가능
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('getAll', async () => {
    const data = await service.getAll(1);
    expect(data).toStrictEqual([
      {
        id: 1,
        email: 'yuni@gmail.com',
      },
      { id: 2, email: 'moti@gmail.com' },
    ]);
  });

  it('getAll empty', async () => {
    const data = await service.getAll(3);
    expect(data).toStrictEqual([]);
  });
});
