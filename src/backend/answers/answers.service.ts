import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NumberAttributeValue } from 'aws-sdk/clients/dynamodb';
import { Answer } from 'src/backend/common/entity/Answer.entity';
import { getDateString } from 'src/backend/common/util/date';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';

import { InvalidAnswerIdException } from './exception/invalid.answer.id.exception';

const relations = ['file', 'mission', 'user'];

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  async getDays({ userId }: { userId: NumberAttributeValue }): Promise<Answer[]> {
    return this.answersRepository.find({
      select: ['date'],
      where: {
        userId,
      },
    });
  }

  async getAnswerByIdAndUserId({ id, userId }: { id: number; userId: number }) {
    return this.answersRepository.findOne({
      where: {
        id,
        userId,
      },
      relations,
    });
  }

  async getAnswersByUserIdAndSetDate({
    userId,
    setDate,
  }: {
    userId: NumberAttributeValue;
    setDate: string;
  }): Promise<Answer[]> {
    return this.answersRepository.find({
      where: {
        userId,
        setDate,
      },
      order: {
        id: -1,
      },
      relations,
    });
  }

  async getAnswerByUserIdAndLessThanId({ userId, answerId }: { userId: number; answerId: number }): Promise<Answer> {
    return this.answersRepository.findOne({
      where: {
        userId,
        id: LessThan(answerId),
      },
      order: {
        id: -1,
      },
    });
  }

  async getAnswersDiary({ userId, limit }: { userId: number; limit: number }): Promise<Answer[]> {
    return this.answersRepository.find({
      where: {
        userId,
      },
      take: limit,
      order: {
        id: -1,
      },
      relations,
    });
  }

  async getAnswersDiaryByDate({
    userId,
    date,
    limit,
    direction,
  }: {
    userId: number;
    date: string;
    limit: number;
    direction: number;
  }): Promise<Answer[]> {
    const whereDate = direction === 0 ? LessThan(date) : MoreThan(date);
    const orderById = direction === 0 ? 'DESC' : 'ASC';
    return this.answersRepository.find({
      where: {
        date: whereDate,
        userId,
      },
      take: limit,
      order: {
        id: orderById,
      },
      relations,
    });
  }

  async deleteAnswer(answer: Answer) {
    return this.answersRepository.remove(answer);
  }

  async updateAnswer(body): Promise<Answer> {
    return this.answersRepository.save(body);
  }

  async checkAnswerId({ id, userId }: { id: number; userId: number }): Promise<Answer> {
    const answer = await this.answersRepository.findOne({
      where: { id, userId },
      relations,
    });
    if (!answer) {
      throw new InvalidAnswerIdException();
    }
    return answer;
  }

  async create(body: Answer): Promise<Answer> {
    const answer = await this.answersRepository.create({
      ...body,
    });
    const returnAnswer = await this.answersRepository.save(answer);
    return returnAnswer;
  }

  getPartNumber(answers: Answer[]) {
    return answers.length >= 6 ? 1 : answers.length + 1;
  }

  getNo(answers: Answer[]): number {
    if (answers.length === 0) {
      return 1;
    } else if (answers.length === 6) {
      return answers[0].no + 1;
    }
    return answers[0].no;
  }

  getSetDate(answers: Answer[]) {
    if (answers.length === 6 || answers.length === 0) {
      return getDateString({});
    } else {
      return answers[0].setDate;
    }
  }

  async getMonthAnswers({ firstDate, lastDate, userId }: { firstDate: string; lastDate: string; userId: number }) {
    return this.answersRepository.find({
      where: {
        userId,
        setDate: Between(firstDate, lastDate),
      },
      order: {
        id: -1,
      },
      relations,
    });
  }

  async getRecentAnswers({ userId, setDate }: { userId: number; setDate: string }): Promise<Answer[]> {
    const answers = await this.answersRepository.find({
      where: {
        userId,
        setDate,
      },
      relations,
    });
    return answers;
  }

  hasSixParsAndNotToday(answers: Answer[]) {
    return answers.length === 6 && answers[5] && answers[5].date !== getDateString({});
  }

  async getAnswerByDateAndUserId({ userId, date }: { userId: number; date: string }) {
    return this.answersRepository.findOne({
      where: {
        userId,
        date,
      },
      relations,
    });
  }

  async getAnswerByUserId({ userId }: { userId: number }): Promise<Answer> {
    return this.answersRepository.findOne({
      where: {
        userId,
      },
      order: {
        id: -1,
      },
      relations,
    });
  }

  async getAnswersByUserIdAndDateRange({ userId, dateGt }: { userId: number; dateGt: string }): Promise<Answer[]> {
    return this.answersRepository.find({
      relations,
      where: {
        userId,
        date: MoreThan(dateGt),
      },
    });
  }
}
