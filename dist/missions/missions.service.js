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
exports.MissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Answer_entity_1 = require("../common/entity/Answer.entity");
const Mission_entity_1 = require("../common/entity/Mission.entity");
const User_entity_1 = require("../common/entity/User.entity");
const date_1 = require("../common/util/date");
const typeorm_2 = require("typeorm");
const invalid_mission_id_dto_1 = require("./dto/invalid.mission.id.dto");
let MissionsService = class MissionsService {
    constructor(missionRepository) {
        this.missionRepository = missionRepository;
    }
    async destroy(id) {
        try {
            const mission = await this.checkMission(id);
            await this.missionRepository.remove(mission);
            return null;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, body) {
        try {
            const mission = await this.checkMission(id);
            const newMission = Object.assign(Object.assign({}, mission), body);
            await this.missionRepository.save(newMission);
            const returnMission = await this.findOne(id);
            return returnMission;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async checkMission(id) {
        try {
            const mission = await this.findOne(id);
            if (!mission) {
                throw new common_1.HttpException(new invalid_mission_id_dto_1.InvalidMissionIdDto(), common_1.HttpStatus.BAD_REQUEST);
            }
            return mission;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(body) {
        try {
            const mission = await this.missionRepository.create(Object.assign({}, body));
            const newMission = this.missionRepository.save(mission);
            return newMission;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const mission = this.missionRepository.findOne({ where: { id } });
            return mission;
        }
        catch (error) {
            const mission = this.missionRepository.findOne({ where: { id } });
            return mission;
        }
    }
    hasRefresh(user) {
        const date = date_1.getDateString({});
        return !!user.refreshDate && user.refreshDate === date;
    }
    getOldMission(user) {
        const { mission } = user;
        return mission && JSON.parse(mission);
    }
    isRefresh(user) {
        const date = date_1.getDateString({});
        return !user.refreshDate || (!!user.refreshDate && user.refreshDate < date);
    }
    hasOldMissions(oldMission) {
        const date = date_1.getDateString({});
        return (!!oldMission && oldMission.date === date && oldMission.missions.length > 0);
    }
    async hasMissionInAnswer({ answer, date }) {
        return (!!answer &&
            !!answer.date &&
            answer.mission &&
            answer.mission.cycle &&
            answer.mission.id &&
            date_1.getDateString({ date: answer.date, day: answer.mission.cycle }) >= date);
    }
    async getMissionsByNotInIdAndLimit({ ids, limit = 3, }) {
        return this.missionRepository
            .createQueryBuilder('missions')
            .where(`id NOT IN (${ids.join(', ')})`)
            .orderBy('RAND()')
            .limit(limit)
            .getMany();
    }
};
MissionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Mission_entity_1.Mission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MissionsService);
exports.MissionsService = MissionsService;
//# sourceMappingURL=missions.service.js.map