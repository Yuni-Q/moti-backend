import { Question } from 'src/common/entity/Question.entity';
import { Repository } from 'typeorm';
import { QuestionsDto } from './dto/questions.dto';
export declare class QuestionsService {
    private questionRepository;
    constructor(questionRepository: Repository<Question>);
    post(content: any): Promise<Question>;
    get(page: number, limit: number): Promise<QuestionsDto['data']>;
    getQuestions(skip: number, take: number): Promise<QuestionsDto['data']>;
    createQuestion(content: string): Promise<Question>;
}
