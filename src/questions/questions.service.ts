import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/common/entity/Question.entity';
import { Repository } from 'typeorm';
import { QuestionsDto } from './dto/questions.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  async post(content): Promise<Question> {
    try {
      const question = await this.createQuestion(content);
      return question;
    } catch (e) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get(page: number, limit: number): Promise<QuestionsDto['data']> {
    try {
      let skip = 0;
      if (page > 1) {
        skip = limit * (page - 1);
      }
      const result = await this.getQuestions(skip, limit);
      return result;
    } catch (e) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getQuestions(
    skip: number,
    take: number,
  ): Promise<QuestionsDto['data']> {
    const [
      questions,
      questionTotalCount,
    ] = await this.questionRepository.findAndCount({ skip, take });
    return { questions, questionTotalCount };
  }

  async createQuestion(content: string) {
    const question = await this.questionRepository.create({
      content,
    } as Question);
    this.questionRepository.save(question);
    return question;
  }
}
