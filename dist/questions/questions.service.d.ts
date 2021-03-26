import { Question } from 'src/common/entity/Question.entity';
import { Repository } from 'typeorm';
import { QuestionsDto } from './dto/questions.dto';
export declare class QuestionsService {
    private questionRepository;
    constructor(questionRepository: Repository<Question>);
    getQuestions({ skip, take, }: {
        skip: number;
        take: number;
    }): Promise<QuestionsDto['data']>;
    createQuestion(content: string): Promise<Question>;
}
