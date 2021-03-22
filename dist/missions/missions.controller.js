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
const token_decorator_1 = require("../common/decorators/token.decorator");
const require_body_dto_1 = require("../common/dto/require.body.dto");
const require_token_dto_1 = require("../common/dto/require.token.dto");
const Answer_entity_1 = require("../common/entity/Answer.entity");
const transformInterceptor_interceptor_1 = require("../common/interceptors/transformInterceptor.interceptor");
const date_1 = require("../common/util/date");
const users_service_1 = require("../users/users.service");
const valid_body_1 = require("./decorators/valid.body");
const delete_mission_dto_1 = require("./dto/delete.mission.dto");
const insufficient_refresh_count_dto_1 = require("./dto/insufficient.refresh.count.dto");
const invalid_mission_id_dto_1 = require("./dto/invalid.mission.id.dto");
const mission_body_dto_1 = require("./dto/mission.body.dto");
const missions_dto_1 = require("./dto/missions.dto");
const missions_service_1 = require("./missions.service");
let MissionsController = class MissionsController {
    constructor(missionsService, answersService, usersService) {
        this.missionsService = missionsService;
        this.answersService = answersService;
        this.usersService = usersService;
    }
    async missions({ id }) {
        try {
            const user = await this.usersService.checkUser(id);
            const oldMission = this.missionsService.getOldMission(user);
            const refresh = this.missionsService.isRefresh(user);
            if (this.missionsService.hasOldMissions(oldMission)) {
                return {
                    status: common_1.HttpStatus.OK,
                    data: { refresh, missions: oldMission.missions },
                };
            }
            const missions = await this.getNewMission(id);
            await this.usersService.setMissionsInUser({ missions, id: id });
            return { status: common_1.HttpStatus.OK, data: { refresh, missions } };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async refresh({ id }) {
        try {
            const user = await this.usersService.checkUser(id);
            if (this.missionsService.hasRefresh(user)) {
                throw new common_1.HttpException(new insufficient_refresh_count_dto_1.InsufficientRefreshCount(), common_1.HttpStatus.BAD_REQUEST);
            }
            const missions = await this.getNewMission(id);
            await this.usersService.setMissionsAndRefreshDateInUser({
                missions,
                id: id,
            });
            return { status: common_1.HttpStatus.OK, data: { refresh: false, missions } };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async mission(user, id) {
        const result = await this.missionsService.findOne(id);
        return { data: result };
    }
    async create(user, body) {
        const result = await this.missionsService.create(body);
        return { status: 201, data: result };
    }
    async update(user, body, id) {
        const result = await this.missionsService.update(id, body);
        return { data: result };
    }
    async destroy(user, id) {
        const result = await this.missionsService.destroy(id);
        return { data: result };
    }
    async getNewMission(userId) {
        const date = date_1.getDateString({});
        const oneYearAgo = date_1.getDateString({ years: -1 });
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
    __param(0, token_decorator_1.Token()),
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
        status: common_1.HttpStatus.BAD_REQUEST,
        type: insufficient_refresh_count_dto_1.InsufficientRefreshCount,
        description: '갱신 횟수가 모자랍니다.',
    }),
    common_1.Get('refresh'),
    __param(0, token_decorator_1.Token()),
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
    __param(0, token_decorator_1.Token()), __param(1, id_decorator_1.Id()),
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
    __param(0, token_decorator_1.Token()), __param(1, valid_body_1.ValidBody()),
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
        status: common_1.HttpStatus.BAD_REQUEST,
        type: invalid_mission_id_dto_1.InvalidMissionIdDto,
        description: '성공',
    }),
    swagger_1.ApiResponse({
        status: new require_body_dto_1.RequireBodyDto().status,
        type: require_body_dto_1.RequireBodyDto,
        description: new require_body_dto_1.RequireBodyDto().message,
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
    __param(0, token_decorator_1.Token()),
    __param(1, valid_body_1.ValidBody()),
    __param(2, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "update", null);
__decorate([
    swagger_1.ApiResponse({
        status: new invalid_mission_id_dto_1.InvalidMissionIdDto().status,
        type: invalid_mission_id_dto_1.InvalidMissionIdDto,
        description: new invalid_mission_id_dto_1.InvalidMissionIdDto().message,
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
    __param(0, token_decorator_1.Token()), __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "destroy", null);
MissionsController = __decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: require_token_dto_1.RequireTokenDto,
        description: '토큰이 필요합니다.',
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