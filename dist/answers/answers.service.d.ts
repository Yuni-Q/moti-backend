import { NumberAttributeValue } from 'aws-sdk/clients/dynamodb';
import { Answer } from 'src/common/entity/Answer.entity';
import { Repository } from 'typeorm';
export declare class AnswersService {
    private answersRepository;
    constructor(answersRepository: Repository<Answer>);
    getDays({ userId, }: {
        userId: NumberAttributeValue;
    }): Promise<Answer[]>;
    getAnswerByIdAndUserId({ id, userId }: {
        id: number;
        userId: number;
    }): Promise<Answer>;
    getAnswersByUserIdAndSetDate({ userId, setDate, }: {
        userId: NumberAttributeValue;
        setDate: string;
    }): Promise<Answer[]>;
    getAnswerByUserIdAndLessThanId({ userId, answerId, }: {
        userId: number;
        answerId: number;
    }): Promise<Answer>;
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
    deleteAnswer(answer: Answer): Promise<Answer>;
    updateAnswer(body: any): Promise<Answer>;
    checkAnswerId({ id, userId, }: {
        id: number;
        userId: number;
    }): Promise<Answer>;
    create(body: Answer): Promise<Answer>;
    getPartNumber(answers: Answer[]): number;
    getNo(answers: Answer[]): number;
    getSetDate(answers: Answer[]): string;
    getMonthAnswers({ firstDate, lastDate, userId, }: {
        firstDate: string;
        lastDate: string;
        userId: number;
    }): Promise<Answer[]>;
    getRecentAnswers({ userId, setDate, }: {
        userId: number;
        setDate: string;
    }): Promise<Answer[]>;
    hasSixParsAndNotToday(answers: Answer[]): boolean;
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
