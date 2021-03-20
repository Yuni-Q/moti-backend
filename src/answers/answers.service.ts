import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/common/entity/Answer.entity';
import { Mission } from 'src/common/entity/Mission.entity';
import { File } from 'src/common/entity/File.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from 'src/common/entity/User.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  async getAnswersByUserIdAndDateRange({
    userId,
    dateGt,
  }: {
    userId: number;
    dateGt: string;
  }): Promise<Answer[]> {
    return this.answersRepository.find({
      relations: ['file', 'mission', 'user'],
      where: {
        userId,
        date: MoreThan(dateGt),
      },
    });
  }
}
