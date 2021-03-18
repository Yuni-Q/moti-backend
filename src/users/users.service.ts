import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(id?: number): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        id: MoreThan(id || 0),
      },
      take: 10,
    });
    return users;
  }
}
