import { Injectable } from '@nestjs/common';
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

  async getQuestions({
    skip,
    take,
  }: {
    skip: number;
    take: number;
  }): Promise<QuestionsDto['data']> {
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
