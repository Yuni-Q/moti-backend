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

  async date(userId: number, date: string): Promise<Answer> {
    const answer = date
      ? await this.getAnswerByDateAndUserId({ userId, date })
      : await this.getAnswerByUserId({ userId });
    return answer;
  }

  async getAnswerByDateAndUserId({
    userId,
    date,
  }: {
    userId: number;
    date: string;
  }) {
    return this.answersRepository.findOne({
      where: {
        userId,
        date,
      },
      relations: ['file', 'mission', 'user'],
    });
  }
  async getAnswerByUserId({ userId }: { userId: number }) {
    return this.answersRepository.findOne({
      where: {
        userId,
      },
      order: {
        setDate: -1,
      },
      relations: ['file', 'mission', 'user'],
    });
  }

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
