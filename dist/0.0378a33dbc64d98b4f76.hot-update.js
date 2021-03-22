exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 78:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnswersController = void 0;
const common_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(5);
const id_decorator_1 = __webpack_require__(36);
const image_uploader_decorator_1 = __webpack_require__(79);
const token_decorator_1 = __webpack_require__(12);
const require_body_dto_1 = __webpack_require__(38);
const require_token_dto_1 = __webpack_require__(16);
const transformInterceptor_interceptor_1 = __webpack_require__(18);
const date_1 = __webpack_require__(46);
const files_service_1 = __webpack_require__(67);
const missions_service_1 = __webpack_require__(76);
const answers_service_1 = __webpack_require__(64);
const answer_dto_1 = __webpack_require__(83);
const answers_dto_1 = __webpack_require__(84);
const delete_answer_dto_1 = __webpack_require__(85);
const diary_answers_dto_1 = __webpack_require__(86);
const list_answers_dto_1 = __webpack_require__(87);
const month_answers_dto_1 = __webpack_require__(88);
const week_answer_dto_1 = __webpack_require__(89);
let AnswersController = class AnswersController {
    constructor(answersService, missionsService, filesService) {
        this.answersService = answersService;
        this.missionsService = missionsService;
        this.filesService = filesService;
    }
    async date(user, date) {
        const result = await this.answersService.date(user.id, date);
        return { data: result };
    }
    async week(user) {
        const result = await this.answersService.week(user.id);
        return { data: result };
    }
    async diary(user, lastIdString, limitString, directionString) {
        try {
            const lastId = parseInt(lastIdString, 10);
            const limit = parseInt(limitString || 100, 10);
            const direction = parseInt(directionString || 0, 10);
            const userId = user.id;
            const answers = lastId
                ? await this.answersService.getAnswersDiaryByLastId({
                    userId,
                    lastId,
                    limit,
                    direction,
                })
                : await await this.answersService.getAnswersDiary({ userId, limit });
            return { data: { lastId, limit, direction, answers } };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async list(user, answerId) {
        const result = await this.answersService.list(user.id, answerId);
        return { data: result };
    }
    async listId(user, id) {
        const result = await this.answersService.listId(id, user.id);
        return { data: result };
    }
    async month(user, date) {
        const result = await this.answersService.month(user.id, date);
        return { data: result };
    }
    async get(user, id) {
        const result = await this.answersService.get(id, user.id);
        return { data: result };
    }
    async post(user, body) {
        const userId = user.id;
        const { file: imageUrl, content, missionId } = body;
        if ((!imageUrl && !content) || !missionId) {
            throw new common_1.HttpException(new require_body_dto_1.RequireBodyDto(), new require_body_dto_1.RequireBodyDto().status);
        }
        await this.answersService.existAnswerByDateAndUserId(userId);
        const lastAnswer = await this.answersService.getAnswerByUserId({ userId });
        const recentAnswers = this.answersService.hasSetDate(lastAnswer)
            ? await this.answersService.getRecentAnswers({
                userId,
                setDate: lastAnswer === null || lastAnswer === void 0 ? void 0 : lastAnswer.setDate,
            })
            : [];
        const setDate = this.answersService.getSetDate(recentAnswers);
        const no = this.answersService.getNo(recentAnswers);
        const partNumber = this.answersService.getPartNumber(recentAnswers);
        const cardFile = await this.filesService.getFileByPart(partNumber);
        const { id: fileId = 1 } = cardFile;
        const mission = await this.missionsService.checkMission(missionId);
        if (!!(mission === null || mission === void 0 ? void 0 : mission.isImage) && !imageUrl) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'file이 필요한 미션 입니다.',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!!(mission === null || mission === void 0 ? void 0 : mission.isContent) && !content) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'content가 필요한 미션 입니다.',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const date = date_1.getDateString({});
        const result = await this.answersService.create(user.id, {
            userId,
            missionId,
            imageUrl,
            fileId,
            content,
            date,
            setDate,
            no,
        });
        const answer = await this.answersService.checkAnswerId(result.id, userId);
        return { status: common_1.HttpStatus.CREATED, data: result };
    }
    async put(user, body, id) {
        const userId = user.id;
        const { file, content, missionId } = body;
        if (!file && !content) {
            throw new common_1.HttpException(new require_body_dto_1.RequireBodyDto(), new require_body_dto_1.RequireBodyDto().status);
        }
        const answer = await this.answersService.checkAnswerId(id, userId);
        const imageUrl = file ? file : answer.imageUrl;
        if (!!answer.mission.isImage && !imageUrl) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'file이 필요한 미션 입니다.',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!!answer.mission.isContent && !content) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'content가 필요한 미션 입니다.',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const result = await this.answersService.updateAnswer(Object.assign(Object.assign({}, answer), { userId,
            missionId,
            imageUrl,
            content }));
        const returnAnswer = await this.answersService.get(result.id, userId);
        return { data: returnAnswer };
    }
    async delete(user, id) {
        const answer = await this.answersService.checkAnswerId(id, user.id);
        await this.answersService.destroy(answer);
        return { data: null, message: new delete_answer_dto_1.DeleteAnswerDto().message };
    }
};
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: answer_dto_1.AnswerDto,
        description: '성공',
    }),
    swagger_1.ApiQuery({
        name: 'date',
        required: true,
        description: '특정 날짜의 답변',
    }),
    common_1.Get(),
    __param(0, token_decorator_1.Token()), __param(1, common_1.Query('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AnswersController.prototype, "date", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: week_answer_dto_1.WeekAnswerDto,
        description: '최근 답변 리스트',
    }),
    common_1.Get('week'),
    __param(0, token_decorator_1.Token()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AnswersController.prototype, "week", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: diary_answers_dto_1.DiaryAnswersDto,
        description: '일기 형식으로 답변 조회',
    }),
    swagger_1.ApiQuery({
        name: 'lastId',
        required: false,
        description: 'lastId',
    }),
    swagger_1.ApiQuery({
        name: 'limit',
        required: false,
        description: 'limit',
    }),
    swagger_1.ApiQuery({
        name: 'direction',
        required: false,
        description: 'direction',
    }),
    common_1.Get('diary'),
    __param(0, token_decorator_1.Token()),
    __param(1, common_1.Query('lastId')),
    __param(2, common_1.Query('limit')),
    __param(3, common_1.Query('direction')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AnswersController.prototype, "diary", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: list_answers_dto_1.ListAnswersDto,
        description: '답변 리스트',
    }),
    swagger_1.ApiQuery({
        name: 'answerId',
        required: false,
        description: '특정 날짜의 답변',
    }),
    common_1.Get('list'),
    __param(0, token_decorator_1.Token()),
    __param(1, common_1.Query('answerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
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
    __param(0, token_decorator_1.Token()), __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
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
    __param(0, token_decorator_1.Token()), __param(1, common_1.Query('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
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
    __param(0, token_decorator_1.Token()), __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
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
    __param(0, token_decorator_1.Token()), __param(1, image_uploader_decorator_1.ImageUploader()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
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
    __param(0, token_decorator_1.Token()),
    __param(1, image_uploader_decorator_1.ImageUploader()),
    __param(2, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
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
    __param(0, token_decorator_1.Token()), __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AnswersController.prototype, "delete", null);
AnswersController = __decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: require_token_dto_1.RequireTokenDto,
        description: '토큰이 필요합니다.',
    }),
    common_1.UseInterceptors(transformInterceptor_interceptor_1.TransformInterceptor),
    swagger_1.ApiBearerAuth('authorization'),
    swagger_1.ApiTags('answers'),
    common_1.Controller('api/v1/answers'),
    __metadata("design:paramtypes", [typeof (_l = typeof answers_service_1.AnswersService !== "undefined" && answers_service_1.AnswersService) === "function" ? _l : Object, typeof (_m = typeof missions_service_1.MissionsService !== "undefined" && missions_service_1.MissionsService) === "function" ? _m : Object, typeof (_o = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _o : Object])
], AnswersController);
exports.AnswersController = AnswersController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "3a3052a6f9849b5d66af"
/******/ 	})();
/******/ 	
/******/ }
;