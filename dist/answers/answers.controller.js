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
exports.AnswersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const id_decorator_1 = require("../common/decorators/id.decorator");
const image_uploader_decorator_1 = require("../common/decorators/image-uploader.decorator");
const token_user_id_decorator_1 = require("../common/decorators/token-user-id.decorator");
const Answer_entity_1 = require("../common/entity/Answer.entity");
const custom_interval_server_error_exception_1 = require("../common/exception/custom.interval.server.error.exception");
const require_body_exception_1 = require("../common/exception/require.body.exception");
const require_token_exception_1 = require("../common/exception/require.token.exception");
const transformInterceptor_interceptor_1 = require("../common/interceptors/transformInterceptor.interceptor");
const date_1 = require("../common/util/date");
const files_service_1 = require("../files/files.service");
const missions_service_1 = require("../missions/missions.service");
const query_number_validation_pipe_1 = require("../common/pipe/query-number.validation.pipe");
const answers_service_1 = require("./answers.service");
const answer_days_dto_1 = require("./dto/answer.days.dto");
const answer_dto_1 = require("./dto/answer.dto");
const answers_dto_1 = require("./dto/answers.dto");
const delete_answer_dto_1 = require("./dto/delete.answer.dto");
const diary_answers_dto_1 = require("./dto/diary.answers.dto");
const list_answers_dto_1 = require("./dto/list.answers.dto");
const month_answers_dto_1 = require("./dto/month.answers.dto");
const week_answer_dto_1 = require("./dto/week.answer.dto");
const exist_answer_exception_1 = require("./exception/exist.answer.exception");
const requrie_content_exception_1 = require("./exception/requrie.content.exception");
const requrie_file_exception_1 = require("./exception/requrie.file.exception");
const timeout_answer_update_exception_1 = require("./exception/timeout.answer.update.exception");
let AnswersController = class AnswersController {
    constructor(answersService, missionsService, filesService) {
        this.answersService = answersService;
        this.missionsService = missionsService;
        this.filesService = filesService;
    }
    async getDays(userId) {
        try {
            const answers = await this.answersService.getDays({ userId });
            const dateList = answers.map((answer) => {
                console.log(answers);
                console.log(answer);
                return answer.date;
            });
            return { data: dateList };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async date(userId, dateString) {
        try {
            const date = dateString ? date_1.getDateString({ date: dateString }) : null;
            const answer = date
                ? await this.answersService.getAnswerByDateAndUserId({ userId, date })
                : await this.answersService.getAnswerByUserId({ userId });
            return { data: answer };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async week(userId) {
        try {
            const answer = await this.answersService.getAnswerByUserId({ userId });
            const recentAnswers = (answer === null || answer === void 0 ? void 0 : answer.setDate)
                ? await this.answersService.getRecentAnswers({
                    userId,
                    setDate: answer.setDate,
                })
                : [];
            const answers = !!recentAnswers && !this.answersService.hasSixParsAndNotToday(recentAnswers) ? recentAnswers : [];
            const today = date_1.getDateString({});
            return { data: { today, answers } };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async diary(userId, dateString, limit, direction) {
        try {
            const date = dateString ? date_1.getDateString({ date: dateString }) : null;
            let answers = date
                ? await this.answersService.getAnswersDiaryByDate({
                    userId,
                    date,
                    limit,
                    direction,
                })
                : await await this.answersService.getAnswersDiary({ userId, limit });
            if (date && direction === 0) {
                answers = answers.sort((answer, compareAnswer) => {
                    return answer.date > compareAnswer.date ? 1 : -1;
                });
            }
            return { data: { date, limit, direction, answers } };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async list(userId, answerId) {
        try {
            let answer;
            const answers = [];
            for (let i = 0; i < 4; i++) {
                answer = answerId
                    ? await this.answersService.getAnswerByUserIdAndLessThanId({
                        userId,
                        answerId,
                    })
                    : await this.answersService.getAnswerByUserId({ userId });
                if (!answer) {
                    break;
                }
                answers[i] = await this.answersService.getAnswersByUserIdAndSetDate({
                    userId,
                    setDate: answer.setDate,
                });
                answerId = answers[i][answers[i].length - 1].id;
            }
            return { data: answers };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async listId(userId, id) {
        try {
            const answer = await this.answersService.getAnswerByIdAndUserId({
                id,
                userId,
            });
            if (!answer || !answer.setDate) {
                return { data: [] };
            }
            const setDate = answer.setDate;
            const answers = await this.answersService.getAnswersByUserIdAndSetDate({
                userId,
                setDate,
            });
            return { data: answers };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async month(userId, date) {
        try {
            const now = date_1.getNow(date);
            const { firstDate, lastDate } = date_1.getMonthDate(now);
            const notGroupAnswers = await this.answersService.getMonthAnswers({
                firstDate,
                lastDate,
                userId,
            });
            const answers = notGroupAnswers.reduce((acc, it) => (Object.assign(Object.assign({}, acc), { [it.setDate]: [...(acc[it.setDate] || []), it] })), {});
            const monthAnswer = Object.values(answers);
            return { data: { date: firstDate, monthAnswer } };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async get(userId, id) {
        try {
            const result = await this.answersService.getAnswerByIdAndUserId({
                id,
                userId,
            });
            return { data: result };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async post(userId, body) {
        try {
            const { file: imageUrl, content, missionId } = body;
            if ((!imageUrl && !content) || !missionId) {
                throw new require_body_exception_1.RequireBodyException();
            }
            const date = date_1.getDateString({});
            const answer = await this.answersService.getAnswerByDateAndUserId({
                userId,
                date,
            });
            if (answer) {
                throw new exist_answer_exception_1.ExistAnswerException();
            }
            const lastAnswer = await this.answersService.getAnswerByUserId({
                userId,
            });
            const recentAnswers = (lastAnswer === null || lastAnswer === void 0 ? void 0 : lastAnswer.setDate)
                ? await this.answersService.getRecentAnswers({
                    userId,
                    setDate: lastAnswer.setDate,
                })
                : [];
            const setDate = this.answersService.getSetDate(recentAnswers);
            const no = this.answersService.getNo(recentAnswers);
            const partNumber = this.answersService.getPartNumber(recentAnswers);
            const cardFile = await this.filesService.getFileByPart(partNumber);
            const { id: fileId = 1 } = cardFile;
            const mission = await this.missionsService.checkMission({
                id: missionId,
            });
            if (!!(mission === null || mission === void 0 ? void 0 : mission.isImage) && !imageUrl) {
                throw new requrie_file_exception_1.RequireFileException();
            }
            if (!!(mission === null || mission === void 0 ? void 0 : mission.isContent) && !content) {
                throw new requrie_content_exception_1.RequireContentException();
            }
            const result = await this.answersService.create({
                userId,
                missionId,
                imageUrl,
                fileId,
                content,
                date,
                setDate,
                no,
            });
            const returnAnswer = await this.answersService.checkAnswerId({
                id: result.id,
                userId,
            });
            return { status: common_1.HttpStatus.CREATED, data: returnAnswer };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async put(userId, body, id) {
        try {
            const { file, content, missionId } = body;
            if (!file && !content) {
                throw new require_body_exception_1.RequireBodyException();
            }
            const answer = await this.answersService.checkAnswerId({ id, userId });
            const date = date_1.getDateString({});
            if (answer.date !== date) {
                throw new timeout_answer_update_exception_1.TimeoutAnswerUpdateException();
            }
            const imageUrl = file ? file : answer.imageUrl;
            if (!!answer.mission.isImage && !imageUrl) {
                throw new requrie_file_exception_1.RequireFileException();
            }
            if (!!answer.mission.isContent && !content) {
                throw new requrie_content_exception_1.RequireContentException();
            }
            const result = await this.answersService.updateAnswer(Object.assign(Object.assign({}, answer), { userId,
                missionId,
                imageUrl,
                content }));
            const returnAnswer = await this.answersService.getAnswerByIdAndUserId({
                id: result.id,
                userId,
            });
            return { data: returnAnswer };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async delete(userId, id) {
        try {
            const answer = await this.answersService.checkAnswerId({ id, userId });
            await this.answersService.deleteAnswer(answer);
            return { data: null, message: new delete_answer_dto_1.DeleteAnswerDto().message };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
};
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: answer_days_dto_1.AnswerDaysDto,
        description: '개인이 답변한 날짜 리스트',
    }),
    common_1.Get('/days'),
    openapi.ApiResponse({ status: 200, type: require("./dto/answer.days.dto").AnswerDaysDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "getDays", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: answer_dto_1.AnswerDto,
        description: '특정 날짜의 답변',
    }),
    swagger_1.ApiQuery({
        name: 'date',
        required: false,
        description: '답변을 원하는 날짜',
    }),
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: require("./dto/answer.dto").AnswerDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, common_1.Query('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "date", null);
__decorate([
    swagger_1.ApiResponse({
        status: new week_answer_dto_1.WeekAnswerDto().statusCode,
        type: week_answer_dto_1.WeekAnswerDto,
        description: '최근 답변 리스트',
    }),
    common_1.Get('week'),
    openapi.ApiResponse({ status: 200, type: require("./dto/week.answer.dto").WeekAnswerDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "week", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: diary_answers_dto_1.DiaryAnswersDto,
        description: '일기 형식으로 답변 조회',
    }),
    swagger_1.ApiQuery({
        name: 'date',
        required: false,
        description: 'date',
    }),
    swagger_1.ApiQuery({
        name: 'limit',
        required: false,
        description: 'limit',
    }),
    swagger_1.ApiQuery({
        name: 'direction',
        required: false,
        description: 'direction (0: get older diaries, 1: get new diaries)',
    }),
    common_1.Get('diary'),
    openapi.ApiResponse({ status: 200, type: require("./dto/diary.answers.dto").DiaryAnswersDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, common_1.Query('date')),
    __param(2, common_1.Query('limit', new query_number_validation_pipe_1.QueryNumberValidationPipe(100))),
    __param(3, common_1.Query('direction', new query_number_validation_pipe_1.QueryNumberValidationPipe(0))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "diary", null);
__decorate([
    swagger_1.ApiOperation({ summary: '드림캐처를 최신부터 4개씩 불러오기' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: list_answers_dto_1.ListAnswersDto,
        description: '답변 리스트',
    }),
    swagger_1.ApiQuery({
        name: 'answerId',
        required: false,
        description: '해당 답변 다음의 리스트 호출을 위한 id',
    }),
    common_1.Get('list'),
    openapi.ApiResponse({ status: 200, type: require("./dto/list.answers.dto").ListAnswersDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, common_1.Query('answerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "list", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: answers_dto_1.AnswersDto,
        description: '답변 리스트',
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'id',
    }),
    common_1.Get('list/:id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/answers.dto").AnswersDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "listId", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: month_answers_dto_1.MonthAnswersDto,
        description: '월간 답변 리스트',
    }),
    swagger_1.ApiQuery({
        name: 'date',
        required: false,
        description: '특정 날짜의 답변',
    }),
    common_1.Get('month'),
    openapi.ApiResponse({ status: 200, type: require("./dto/month.answers.dto").MonthAnswersDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, common_1.Query('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "month", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: answer_dto_1.AnswerDto,
        description: '단건 답변 조회',
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'id',
    }),
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/answer.dto").AnswerDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "get", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: answer_dto_1.AnswerDto,
        description: '답변',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiBody({
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                content: {
                    type: 'string',
                    format: 'string',
                },
                missionId: {
                    type: 'integer',
                    format: 'integer',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    common_1.Post(''),
    openapi.ApiResponse({ status: 201, type: require("./dto/answer.dto").AnswerDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, image_uploader_decorator_1.ImageUploader('answers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "post", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: answer_dto_1.AnswerDto,
        description: '답변',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiBody({
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                content: {
                    type: 'string',
                    format: 'string',
                },
                missionId: {
                    type: 'integer',
                    format: 'integer',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'id',
    }),
    common_1.Put(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/answer.dto").AnswerDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, image_uploader_decorator_1.ImageUploader('answers')),
    __param(2, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "put", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: delete_answer_dto_1.DeleteAnswerDto,
        description: '답변',
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'id',
    }),
    common_1.Delete(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/delete.answer.dto").DeleteAnswerDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "delete", null);
AnswersController = __decorate([
    swagger_1.ApiResponse({
        status: new require_token_exception_1.RequireTokenException().getStatus(),
        type: require_token_exception_1.RequireTokenException,
        description: new require_token_exception_1.RequireTokenException().message,
    }),
    common_1.UseInterceptors(transformInterceptor_interceptor_1.TransformInterceptor),
    swagger_1.ApiBearerAuth('authorization'),
    swagger_1.ApiTags('answers'),
    common_1.Controller('api/v1/answers'),
    __metadata("design:paramtypes", [answers_service_1.AnswersService,
        missions_service_1.MissionsService,
        files_service_1.FilesService])
], AnswersController);
exports.AnswersController = AnswersController;
//# sourceMappingURL=answers.controller.js.map