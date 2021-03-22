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
const Mission_entity_1 = require("../common/entity/Mission.entity");
const File_entity_1 = require("../common/entity/File.entity");
const typeorm_2 = require("typeorm");
const User_entity_1 = require("../common/entity/User.entity");
const date_1 = require("../common/util/date");
const exist_answer_dto_1 = require("./dto/exist.answer.dto");
const missions_service_1 = require("../missions/missions.service");
const files_service_1 = require("../files/files.service");
const invalid_answer_id_dto_1 = require("./dto/invalid.answer.id.dto");
let AnswersService = class AnswersService {
    constructor(answersRepository) {
        this.answersRepository = answersRepository;
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
            relations: ['file', 'mission', 'user'],
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
            relations: ['file', 'mission', 'user'],
        });
    }
    async destroy(answer) {
        try {
            await this.answersRepository.remove(answer);
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAnswer(body) {
        const answer = await this.answersRepository.save(body);
        return answer;
    }
    async checkAnswerId(id, userId) {
        const answer = await this.answersRepository.findOne({
            where: { id, userId },
            relations: ['file', 'mission', 'user'],
        });
        if (!answer) {
            throw new common_1.HttpException(new invalid_answer_id_dto_1.InvalidAnswerIdDto(), new invalid_answer_id_dto_1.InvalidAnswerIdDto().status);
        }
        return answer;
    }
    async create(userId, body) {
        try {
            const answer = await this.answersRepository.create(Object.assign({}, body));
            const returnAnswer = await this.answersRepository.save(answer);
            return returnAnswer;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    hasSetDate(answer) {
        return !!answer && !!answer.setDate;
    }
    async existAnswerByDateAndUserId(userId) {
        const date = date_1.getDateString({});
        const answer = await this.getAnswerByDateAndUserId({ userId, date });
        if (!!answer) {
            throw new common_1.HttpException(new exist_answer_dto_1.ExistAnswerDto(), new exist_answer_dto_1.ExistAnswerDto().status);
        }
    }
    async get(id, userId) {
        const answer = await this.answersRepository.findOne({
            where: { id, userId },
            relations: ['file', 'mission', 'user'],
        });
        return answer;
    }
    async month(userId, date) {
        const now = date_1.getNow(date);
        const { firstDate, lastDate } = date_1.getMonthDate(now);
        console.log(firstDate, lastDate);
        const notGroupAnswers = await this.getMonthAnswers({
            firstDate,
            lastDate,
            userId,
        });
        const answers = notGroupAnswers.reduce((acc, it) => (Object.assign(Object.assign({}, acc), { [it.setDate]: [...(acc[it.setDate] || []), it] })), {});
        const monthAnswer = Object.values(answers);
        return { date, monthAnswer };
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
            relations: ['file', 'mission', 'user'],
        });
    }
    async listId(id, userId) {
        const answer = await this.answersRepository.findOne({
            where: {
                userId,
                id,
            },
            order: { id: -1 },
        });
        if (!answer || !answer.setDate) {
            return [];
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
    async list(userId, answerId) {
        try {
            let answer;
            const answers = [];
            for (let i = 0; i < 4; i++) {
                if (answerId) {
                    answer = await this.answersRepository.findOne({
                        where: {
                            userId,
                            id: typeorm_2.LessThan(answerId),
                        },
                        order: {
                            id: -1,
                        },
                    });
                }
                else {
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
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async week(userId) {
        try {
            const answers = await this.getAnswerByUserId({ userId });
            const recentAnswers = answers && answers.setDate
                ? await this.getRecentAnswers({ userId, setDate: answers.setDate })
                : [];
            const newAnswers = !!recentAnswers && !this.hasSixParsAndNotToday(recentAnswers)
                ? recentAnswers
                : [];
            const today = date_1.getDateString({});
            return { today, answers: newAnswers };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRecentAnswers({ userId, setDate, }) {
        const answers = await this.answersRepository.find({
            where: {
                userId,
                setDate,
            },
            relations: ['file', 'mission', 'user'],
        });
        return answers;
    }
    hasSixParsAndNotToday(answers) {
        return (answers.length === 6 &&
            answers[5] &&
            answers[5].date !== date_1.getDateString({}));
    }
    async date(userId, date) {
        const answer = date
            ? await this.getAnswerByDateAndUserId({ userId, date })
            : await this.getAnswerByUserId({ userId });
        return answer;
    }
    async getAnswerByDateAndUserId({ userId, date, }) {
        return this.answersRepository.findOne({
            where: {
                userId,
                date,
            },
            relations: ['file', 'mission', 'user'],
        });
    }
    async getAnswerByUserId({ userId }) {
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
    async getAnswersByUserIdAndDateRange({ userId, dateGt, }) {
        return this.answersRepository.find({
            relations: ['file', 'mission', 'user'],
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