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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const custom_interval_server_error_exception_1 = require("../common/exception/custom.interval.server.error.exception");
const invalid_query_exception_1 = require("../common/exception/invalid.query.exception");
const transformInterceptor_interceptor_1 = require("../common/interceptors/transformInterceptor.interceptor");
const valid_body_1 = require("./decorators/valid.body");
const question_dto_1 = require("./dto/question.dto");
const questions_dto_1 = require("./dto/questions.dto");
const questions_post_request_dto_1 = require("./dto/questions.post.request.dto");
const questions_service_1 = require("./questions.service");
let QuestionsController = class QuestionsController {
    constructor(QuestionsService) {
        this.QuestionsService = QuestionsService;
    }
    async post(body) {
        try {
            const result = await this.QuestionsService.createQuestion(body.content);
            return { status: common_1.HttpStatus.CREATED, data: result };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async get(pageString, limitString) {
        try {
            const page = parseInt(pageString || 1, 10);
            const limit = parseInt(limitString || 1, 10);
            if (isNaN(page) || isNaN(limit)) {
                throw new invalid_query_exception_1.InvalidQueryException();
            }
            let skip = 0;
            if (page > 1) {
                skip = limit * (page - 1);
            }
            const result = await this.QuestionsService.getQuestions({
                skip,
                take: limit,
            });
            return { data: result };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
};
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: question_dto_1.QuestionDto,
        description: '성공',
    }),
    swagger_1.ApiOperation({ summary: '질문 등록' }),
    common_1.Post(''),
    __param(0, valid_body_1.ValidBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [questions_post_request_dto_1.QuestionsPostRequestDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "post", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: questions_dto_1.QuestionsDto,
        description: '성공',
    }),
    swagger_1.ApiQuery({ name: 'page', required: false, description: 'page' }),
    swagger_1.ApiQuery({ name: 'limit', required: false, description: 'limit' }),
    swagger_1.ApiOperation({ summary: '질문 조회' }),
    common_1.Get(''),
    __param(0, common_1.Query('page')),
    __param(1, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "get", null);
QuestionsController = __decorate([
    common_1.UseInterceptors(transformInterceptor_interceptor_1.TransformInterceptor),
    swagger_1.ApiTags('questions'),
    common_1.Controller('api/v1/questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
exports.QuestionsController = QuestionsController;
//# sourceMappingURL=questions.controller.js.map