"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Answer_entity_1 = require("../common/entity/Answer.entity");
const date_1 = require("../common/util/date");
const typeorm_2 = require("typeorm");
const invalid_answer_id_exception_1 = require("./exception/invalid.answer.id.exception");
const relations = ['file', 'mission', 'user'];
let AnswersService = class AnswersService {
    constructor(answersRepository) {
        this.answersRepository = answersRepository;
    }
    async getDays({ userId, }) {
        return this.answersRepository.find({
            select: ['date'],
            where: {
                userId,
            },
        });
    }
    async getAnswerByIdAndUserId({ id, userId }) {
        return this.answersRepository.findOne({
            where: {
                id,
                userId,
            },
            order: { id: -1 },
        });
    }
    async getAnswersByUserIdAndSetDate({ userId, setDate, }) {
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
    async getAnswerByUserIdAndLessThanId({ userId, answerId, }) {
        return this.answersRepository.findOne({
            where: {
                userId,
                id: typeorm_2.LessThan(answerId),
            },
            order: {
                id: -1,
            },
        });
    }
    async getAnswersDiary({ userId, limit, }) {
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
    async getAnswersDiaryByLastId({ userId, lastId, limit, direction, }) {
        const id = direction === 0 ? typeorm_2.LessThan(lastId) : typeorm_2.MoreThan(lastId);
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
    async deleteAnswer(answer) {
        return this.answersRepository.remove(answer);
    }
    async updateAnswer(body) {
        return this.answersRepository.save(body);
    }
    async checkAnswerId({ id, userId, }) {
        const answer = await this.answersRepository.findOne({
            where: { id, userId },
            relations,
        });
        if (!answer) {
            throw new invalid_answer_id_exception_1.InvalidAnswerIdException();
        }
        return answer;
    }
    async create(body) {
        const answer = await this.answersRepository.create(Object.assign({}, body));
        const returnAnswer = await this.answersRepository.save(answer);
        return returnAnswer;
    }
    getPartNumber(answers) {
        return answers.length >= 6 ? 1 : answers.length + 1;
    }
    getNo(answers) {
        if (answers.length === 0) {
            return 1;
        }
        else if (answers.length === 6) {
            return answers[0].no + 1;
        }
        return answers[0].no;
    }
    getSetDate(answers) {
        if (answers.length === 6 || answers.length === 0) {
            return date_1.getDateString({});
        }
        else {
            return answers[0].setDate;
        }
    }
    async getMonthAnswers({ firstDate, lastDate, userId, }) {
        return this.answersRepository.find({
            where: {
                userId,
                setDate: typeorm_2.Between(firstDate, lastDate),
            },
            order: {
                no: -1,
            },
            relations,
        });
    }
    async getRecentAnswers({ userId, setDate, }) {
        const answers = await this.answersRepository.find({
            where: {
                userId,
                setDate,
            },
            relations,
        });
        return answers;
    }
    hasSixParsAndNotToday(answers) {
        return (answers.length === 6 &&
            answers[5] &&
            answers[5].date !== date_1.getDateString({}));
    }
    async getAnswerByDateAndUserId({ userId, date, }) {
        return this.answersRepository.findOne({
            where: {
                userId,
                date,
            },
            relations,
        });
    }
    async getAnswerByUserId({ userId }) {
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
    async getAnswersByUserIdAndDateRange({ userId, dateGt, }) {
        return this.answersRepository.find({
            relations,
            where: {
                userId,
                date: typeorm_2.MoreThan(dateGt),
            },
        });
    }
};
AnswersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Answer_entity_1.Answer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AnswersService);
exports.AnswersService = AnswersService;
//# sourceMappingURL=answers.service.js.map