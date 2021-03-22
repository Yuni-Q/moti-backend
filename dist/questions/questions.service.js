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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Question_entity_1 = require("../common/entity/Question.entity");
const typeorm_2 = require("typeorm");
let QuestionsService = class QuestionsService {
    constructor(questionRepository) {
        this.questionRepository = questionRepository;
    }
    async post(content) {
        try {
            const question = await this.createQuestion(content);
            return question;
        }
        catch (e) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.INTERNAL_SERVER_ERROR, message: e.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async get(page, limit) {
        try {
            let skip = 0;
            if (page > 1) {
                skip = limit * (page - 1);
            }
            const result = await this.getQuestions(skip, limit);
            return result;
        }
        catch (e) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.INTERNAL_SERVER_ERROR, message: e.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getQuestions(skip, take) {
        const [questions, questionTotalCount,] = await this.questionRepository.findAndCount({ skip, take });
        return { questions, questionTotalCount };
    }
    async createQuestion(content) {
        const question = await this.questionRepository.create({
            content,
        });
        this.questionRepository.save(question);
        return question;
    }
};
QuestionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuestionsService);
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map