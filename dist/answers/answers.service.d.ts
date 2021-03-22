import { Answer } from 'src/common/entity/Answer.entity';
import { Repository } from 'typeorm';
import { WeekAnswerDto } from './dto/week.answer.dto';
import { ListAnswersDto } from './dto/list.answers.dto';
import { MonthAnswersDto } from './dto/month.answers.dto';
export declare class AnswersService {
    private answersRepository;
    constructor(answersRepository: Repository<Answer>);
    getAnswersDiary({ userId, limit, }: {
        userId: number;
        limit: number;
    }): Promise<Answer[]>;
    getAnswersDiaryByLastId({ userId, lastId, limit, direction, }: {
        userId: number;
        lastId: number;
        limit: number;
        direction: number;
    }): Promise<Answer[]>;
    destroy(answer: Answer): Promise<void>;
    updateAnswer(body: any): Promise<Answer>;
    checkAnswerId(id: number, userId: number): Promise<Answer>;
    create(userId: number, body: Answer): Promise<Answer>;
    getPartNumber(answers: Answer[]): number;
    getNo(answers: Answer[]): number;
    getSetDate(answers: Answer[]): string;
    hasSetDate(answer: Answer): boolean;
    existAnswerByDateAndUserId(userId: number): Promise<void>;
    get(id: number, userId: number): Promise<Answer>;
    month(userId: number, date?: string): Promise<MonthAnswersDto['data']>;
    getMonthAnswers({ firstDate, lastDate, userId, }: {
        firstDate: string;
        lastDate: string;
        userId: number;
    }): Promise<Answer[]>;
    listId(id: number, userId: number): Promise<Answer[]>;
    list(userId: number, answerId?: string): Promise<ListAnswersDto['data']>;
    week(userId: number): Promise<WeekAnswerDto['data']>;
    getRecentAnswers({ userId, setDate, }: {
        userId: number;
        setDate: string;
    }): Promise<Answer[]>;
    hasSixParsAndNotToday(answers: Answer[]): boolean;
    date(userId: number, date?: string): Promise<Answer>;
    getAnswerByDateAndUserId({ userId, date, }: {
        userId: number;
        date: string;
    }): Promise<Answer>;
    getAnswerByUserId({ userId }: {
        userId: number;
    }): Promise<Answer>;
    getAnswersByUserIdAndDateRange({ userId, dateGt, }: {
        userId: number;
        dateGt: string;
    }): Promise<Answer[]>;
}
