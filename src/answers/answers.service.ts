import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NumberAttributeValue } from 'aws-sdk/clients/dynamodb';
import { Answer } from 'src/common/entity/Answer.entity';
import { getDateString, getMonthDate, getNow } from 'src/common/util/date';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { ExistAnswerDto } from './dto/exist.answer.dto';
import { InvalidAnswerIdDto } from './dto/invalid.answer.id.dto';
import { ListAnswersDto } from './dto/list.answers.dto';
import { MonthAnswersDto } from './dto/month.answers.dto';
import { WeekAnswerDto } from './dto/week.answer.dto';

const relations = ['file', 'mission', 'user'];

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

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

  async getAnswerByUserIdAndLessThanId({
    userId,
    answerId,
  }: {
    userId: number;
    answerId: number;
  }): Promise<Answer> {
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

  async getAnswersDiary({
    userId,
    limit,
  }: {
    userId: number;
    limit: number;
  }): Promise<Answer[]> {
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

  async getAnswersDiaryByLastId({
    userId,
    lastId,
    limit,
    direction,
  }: {
    userId: number;
    lastId: number;
    limit: number;
    direction: number;
  }): Promise<Answer[]> {
    const id = direction === 0 ? LessThan(lastId) : MoreThan(lastId);
    return this.answersRepository.find({
      where: {
        id,
        userId,
      },
      take: limit,
      order: {
        id: -1,
      },
      relations,
    });
  }

  async destroy(answer: Answer) {
    try {
      await this.answersRepository.remove(answer);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAnswer(body): Promise<Answer> {
    const answer = await this.answersRepository.save(body);
    return answer;
  }

  async checkAnswerId(id: number, userId: number): Promise<Answer> {
    const answer = await this.answersRepository.findOne({
      where: { id, userId },
      relations,
    });
    if (!answer) {
      throw new HttpException(
        new InvalidAnswerIdDto(),
        new InvalidAnswerIdDto().status,
      );
    }
    return answer;
  }

  async create(userId: number, body: Answer): Promise<Answer> {
    try {
      const answer = await this.answersRepository.create({
        ...body,
      });
      const returnAnswer = await this.answersRepository.save(answer);
      return returnAnswer;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getPartNumber(answers: Answer[]) {
    return answers.length >= 6 ? 1 : answers.length + 1;
  }

  getNo(answers: Answer[]): number {
    if (answers.length === 0) {
      return 1;
    } else if (answers.length === 6) {
      return answers[0].no! + 1;
    }
    return answers[0].no!;
  }

  getSetDate(answers: Answer[]) {
    if (answers.length === 6 || answers.length === 0) {
      return getDateString({});
    } else {
      return answers[0].setDate;
    }
  }

  hasSetDate(answer: Answer) {
    return !!answer && !!answer.setDate;
  }

  async existAnswerByDateAndUserId(userId: number) {
    const date = getDateString({});
    const answer = await this.getAnswerByDateAndUserId({ userId, date });
    if (!!answer) {
      throw new HttpException(
        new ExistAnswerDto(),
        new ExistAnswerDto().status,
      );
    }
  }

  async get(id: number, userId: number) {
    const answer = await this.answersRepository.findOne({
      where: { id, userId },
      relations,
    });
    return answer;
  }

  async month(userId: number, date?: string): Promise<MonthAnswersDto['data']> {
    const now = getNow(date);
    const { firstDate, lastDate } = getMonthDate(now);
    console.log(firstDate, lastDate);
    const notGroupAnswers = await this.getMonthAnswers({
      firstDate,
      lastDate,
      userId,
    });
    const answers = notGroupAnswers.reduce(
      (acc: any, it: Answer) => ({
        ...acc,
        [it.setDate]: [...(acc[it.setDate] || []), it],
      }),
      {},
    );
    const monthAnswer = Object.values(answers) as Answer[][];
    return { date, monthAnswer };
  }

  async getMonthAnswers({
    firstDate,
    lastDate,
    userId,
  }: {
    firstDate: string;
    lastDate: string;
    userId: number;
  }) {
    return this.answersRepository.find({
      where: {
        userId,
        setDate: Between(firstDate, lastDate),
      },
      order: {
        no: -1,
      },
      relations,
    });
  }

  async listId(id: number, userId: number): Promise<Answer[]> {
    const answer = await this.answersRepository.findOne({
      where: {
        userId,
        id,
      },
      order: { id: -1 },
    });
    if (!answer || !answer.setDate) {
      return [] as Answer[];
    }
    const answers = await this.answersRepository.find({
      where: {
        userId,
        setDate: answer.setDate,
      },
      order: { id: -1 },
      relations,
    });
    return answers;
  }

  async getRecentAnswers({
    userId,
    setDate,
  }: {
    userId: number;
    setDate: string;
  }): Promise<Answer[]> {
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
    return (
      answers.length === 6 &&
      answers[5] &&
      answers[5].date !== getDateString({})
    );
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

  async getAnswersByUserIdAndDateRange({
    userId,
    dateGt,
  }: {
    userId: number;
    dateGt: string;
  }): Promise<Answer[]> {
    return this.answersRepository.find({
      relations,
      where: {
        userId,
        date: MoreThan(dateGt),
      },
    });
  }
}
