import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/common/entity/Question.entity';
import { Repository } from 'typeorm';

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

  async createQuestion(content: string) {
    const question = await this.questionRepository.create({
      content,
    } as Question);
    this.questionRepository.save(question);
    return question;
  }
}
