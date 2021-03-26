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
exports.MissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const answers_service_1 = require("../answers/answers.service");
const id_decorator_1 = require("../common/decorators/id.decorator");
const token_user_id_decorator_1 = require("../common/decorators/token.user.id.decorator");
const Answer_entity_1 = require("../common/entity/Answer.entity");
const custom_interval_server_error_exception_1 = require("../common/exception/custom.interval.server.error.exception");
const require_body_exception_1 = require("../common/exception/require.body.exception");
const require_token_exception_1 = require("../common/exception/require.token.exception");
const transformInterceptor_interceptor_1 = require("../common/interceptors/transformInterceptor.interceptor");
const date_1 = require("../common/util/date");
const users_service_1 = require("../users/users.service");
const valid_body_1 = require("./decorators/valid.body");
const delete_mission_dto_1 = require("./dto/delete.mission.dto");
const mission_body_dto_1 = require("./dto/mission.body.dto");
const missions_dto_1 = require("./dto/missions.dto");
const insufficient_refresh_count_exception_1 = require("./exception/insufficient.refresh.count.exception");
const invalid_mission_id_exception_1 = require("./exception/invalid.mission.id.exception");
const missions_service_1 = require("./missions.service");
let MissionsController = class MissionsController {
    constructor(missionsService, answersService, usersService) {
        this.missionsService = missionsService;
        this.answersService = answersService;
        this.usersService = usersService;
    }
    async missions(userId) {
        try {
            const date = date_1.getDateString({});
            const user = await this.usersService.checkUser({ id: userId });
            const mission = this.missionsService.getOldMission({
                mission: user.mission,
            });
            const refresh = this.missionsService.isRefresh({ user, date });
            if (this.missionsService.hasOldMissions({ mission, date })) {
                return {
                    data: { refresh, missions: mission.missions },
                };
            }
            const oneYearAgo = date_1.getDateString({ date, years: -1 });
            const missions = await this.getNewMission({ date, userId, oneYearAgo });
            const newUser = Object.assign(Object.assign({}, user), { mission: JSON.stringify({ date, missions }) });
            await this.usersService.updateUser(newUser);
            return { data: { refresh, missions } };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async refresh(userId) {
        try {
            const user = await this.usersService.checkUser({ id: userId });
            const date = date_1.getDateString({});
            if (this.missionsService.hasRefresh({ user, date })) {
                throw new insufficient_refresh_count_exception_1.InsufficientRefreshCountException();
            }
            const oneYearAgo = date_1.getDateString({ date, years: -1 });
            const missions = await this.getNewMission({ date, userId, oneYearAgo });
            const newUser = Object.assign(Object.assign({}, user), { refreshDate: date, mission: JSON.stringify({ date, missions }) });
            await this.usersService.updateUser(newUser);
            return { status: common_1.HttpStatus.OK, data: { refresh: false, missions } };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async mission(userId, id) {
        try {
            const mission = await this.missionsService.getMissionById({ id });
            return { data: mission };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async create(userId, body) {
        try {
            const mission = await this.missionsService.createMission(body);
            return { status: common_1.HttpStatus.CREATED, data: mission };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async update(userId, body, id) {
        try {
            const mission = await this.missionsService.checkMission({ id });
            const newMission = Object.assign(Object.assign({}, mission), body);
            const returnMission = await this.missionsService.updateMission(newMission);
            return { data: returnMission };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async destroy(userId, id) {
        try {
            const mission = await this.missionsService.checkMission({ id });
            await this.missionsService.deleteMission(mission);
            return { data: null };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async getNewMission({ oneYearAgo, date, userId, }) {
        const oneYearData = await this.answersService.getAnswersByUserIdAndDateRange({
            userId,
            dateGt: oneYearAgo,
        });
        const ids = [];
        oneYearData.forEach((answer) => {
            if (this.missionsService.hasMissionInAnswer({ answer, date })) {
                ids.push(answer.mission.id);
            }
        });
        const missions = this.missionsService.getMissionsByNotInIdAndLimit({ ids });
        return missions;
    }
};
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: missions_dto_1.MissionsDto,
        description: '성공',
    }),
    common_1.Get(),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "missions", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: missions_dto_1.MissionsDto,
        description: '성공',
    }),
    swagger_1.ApiResponse({
        status: new insufficient_refresh_count_exception_1.InsufficientRefreshCountException().statusCode,
        type: insufficient_refresh_count_exception_1.InsufficientRefreshCountException,
        description: new insufficient_refresh_count_exception_1.InsufficientRefreshCountException().message,
    }),
    common_1.Get('refresh'),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "refresh", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: missions_dto_1.MissionsDto,
        description: '성공',
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'path',
    }),
    common_1.Get(':id'),
    __param(0, token_user_id_decorator_1.TokenUserId()), __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "mission", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: missions_dto_1.MissionsDto,
        description: '성공',
    }),
    swagger_1.ApiBody({
        type: mission_body_dto_1.MissionBodyDto,
        required: true,
        description: 'body',
    }),
    common_1.Post(),
    __param(0, token_user_id_decorator_1.TokenUserId()), __param(1, valid_body_1.ValidBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "create", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: missions_dto_1.MissionsDto,
        description: '성공',
    }),
    swagger_1.ApiResponse({
        status: new invalid_mission_id_exception_1.InvalidMissionIdException().statusCode,
        type: invalid_mission_id_exception_1.InvalidMissionIdException,
        description: new invalid_mission_id_exception_1.InvalidMissionIdException().message,
    }),
    swagger_1.ApiResponse({
        status: new require_body_exception_1.RequireBodyException().statusCode,
        type: require_body_exception_1.RequireBodyException,
        description: new require_body_exception_1.RequireBodyException().message,
    }),
    swagger_1.ApiBody({
        type: mission_body_dto_1.MissionBodyDto,
        required: true,
        description: 'body',
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'path',
    }),
    common_1.Put(':id'),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, valid_body_1.ValidBody()),
    __param(2, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "update", null);
__decorate([
    swagger_1.ApiResponse({
        status: new invalid_mission_id_exception_1.InvalidMissionIdException().statusCode,
        type: invalid_mission_id_exception_1.InvalidMissionIdException,
        description: new invalid_mission_id_exception_1.InvalidMissionIdException().message,
    }),
    swagger_1.ApiResponse({
        status: new delete_mission_dto_1.DeleteMissionDto().status,
        type: delete_mission_dto_1.DeleteMissionDto,
        description: new delete_mission_dto_1.DeleteMissionDto().message,
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'path',
    }),
    common_1.Delete(':id'),
    __param(0, token_user_id_decorator_1.TokenUserId()), __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "destroy", null);
MissionsController = __decorate([
    swagger_1.ApiResponse({
        status: new require_token_exception_1.RequireTokenException().statusCode,
        type: require_token_exception_1.RequireTokenException,
        description: new require_token_exception_1.RequireTokenException().message,
    }),
    common_1.UseInterceptors(transformInterceptor_interceptor_1.TransformInterceptor),
    swagger_1.ApiBearerAuth('authorization'),
    swagger_1.ApiTags('missions'),
    common_1.Controller('api/v1/missions'),
    __metadata("design:paramtypes", [missions_service_1.MissionsService,
        answers_service_1.AnswersService,
        users_service_1.UsersService])
], MissionsController);
exports.MissionsController = MissionsController;
//# sourceMappingURL=missions.controller.js.map