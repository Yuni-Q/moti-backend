import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/common/entity/Answer.entity';
import { Mission } from 'src/common/entity/Mission.entity';
import { File } from 'src/common/entity/File.entity';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { User } from 'src/common/entity/User.entity';
import { getDateString, getMonthDate, getNow } from 'src/common/util/date';
import { WeekAnswerDto } from './dto/week.answer.dto';
import { ListAnswersDto } from './dto/list.answers.dto';
import { MonthAnswersDto } from './dto/month.answers.dto';
import { ExistAnswerDto } from './dto/exist.answer.dto';
import { MissionsService } from 'src/missions/missions.service';
import { FilesService } from 'src/files/files.service';
import { InvalidAnswerIdDto } from './dto/invalid.answer.id.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  async updateAnswer(body): Promise<Answer> {
    const answer = await this.answersRepository.save(body);
    return answer;
  }

  async checkAnswerId(id: number, userId: number): Promise<Answer> {
    const answer = await this.answersRepository.findOne({
      where: { id, userId },
      relations: ['file', 'mission', 'user'],
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
      relations: ['file', 'mission', 'user'],
    });
    return answer;
  }

  async month(userId: number, date?: string): Promise<MonthAnswersDto['data']> {
    const now = getNow(date);
    const { firstDate, lastDate } = getMonthDate(now);
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
    return { firstDate, monthAnswer };
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
      relations: ['file', 'mission', 'user'],
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
      relations: ['file', 'mission', 'user'],
    });
    return answers;
  }

  async list(
    userId: number,
    answerId?: string,
  ): Promise<ListAnswersDto['data']> {
    try {
      let answer;
      const answers = [];
      for (let i = 0; i < 4; i++) {
        if (answerId) {
          answer = await this.answersRepository.findOne({
            where: {
              userId,
              id: LessThan(answerId),
            },
            order: {
              id: -1,
            },
          });
        } else {
          answer = await this.answersRepository.findOne({
            where: {
              userId,
            },
            order: {
              id: -1,
            },
          });
        }
        if (!answer) {
          break;
        }
        answers[i] = await this.answersRepository.find({
          where: {
            userId,
            setDate: answer.setDate,
          },
          order: {
            id: -1,
          },
          relations: ['file', 'mission', 'user'],
        });
        answerId = answers[i][answers[i].length - 1].id;
      }
      return answers;
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

  async week(userId: number): Promise<WeekAnswerDto['data']> {
    try {
      const answers = await this.getAnswerByUserId({ userId });
      const recentAnswers: Answer[] =
        answers && answers.setDate
          ? await this.getRecentAnswers({ userId, setDate: answers.setDate })
          : [];
      // 6개의 파츠를 모두 모은 날이 오늘이 아니면 새로운 것을 준다
      const newAnswers =
        !!recentAnswers && !this.hasSixParsAndNotToday(recentAnswers)
          ? recentAnswers
          : [];
      const today = getDateString({});
      return { today, answers: newAnswers };
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
      relations: ['file', 'mission', 'user'],
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

  async date(userId: number, date?: string): Promise<Answer> {
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
