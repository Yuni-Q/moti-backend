import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/common/entity/Answer.entity';
import { Mission } from 'src/common/entity/Mission.entity';
import { File } from 'src/common/entity/File.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from 'src/common/entity/User.entity';
import { getDateString } from 'src/common/util/date';
import { WeekAnswerDto } from './dto/week.answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

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
