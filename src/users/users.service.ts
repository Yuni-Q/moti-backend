import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entity/User.entity';
import { MoreThan, Repository } from 'typeorm';
import { BodyDto } from './dto/body.dto';
import { InvalidUserIdDto } from './dto/invalid.user.id.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(id?: string): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        id: MoreThan(parseInt(id, 10) || 0),
      },
      take: 10,
    });
    return users;
  }

  async get(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  async updateMyInfo(id: number, body: BodyDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException(new InvalidUserIdDto(), HttpStatus.BAD_REQUEST);
    }
    const newUser = { ...user, ...body };
    await this.userRepository.save(newUser);
    const returnUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return returnUser;
  }
}
