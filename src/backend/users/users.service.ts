import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/backend/common/entity/User.entity';
import { MoreThan, Repository } from 'typeorm';
import { InvalidUserIdException } from './exception/invalid.user.id.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(body: User): Promise<User> {
    const user = await this.userRepository.create({ ...body });
    const newUser = this.userRepository.save(user);
    return newUser;
  }

  async getAll(id: number): Promise<User[]> {
    return this.userRepository.find({
      where: {
        id: MoreThan(id),
      },
      take: 10,
    });
  }

  async getUserById({ id }: { id: number }): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getUserBySnsIdAndSnsType({
    snsId,
    snsType,
  }: {
    snsId: string;
    snsType: string;
  }): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { snsId, snsType },
    });
    return user;
  }

  async updateMyInfo(body): Promise<User> {
    return this.userRepository.save(body);
  }

  async deleteUser(user: User) {
    return this.userRepository.remove(user);
  }

  async checkUser({ id }: { id: number }): Promise<User> {
    const user = await this.getUserById({ id });
    if (!user) {
      throw new InvalidUserIdException();
    }
    return user;
  }

  async updateUser(body): Promise<User> {
    return this.userRepository.save(body);
  }
}
