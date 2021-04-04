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
const invalid_mission_id_exception_1 = require("./exception/invalid.mission.id.exception");
let MissionsService = class MissionsService {
    constructor(missionRepository) {
        this.missionRepository = missionRepository;
    }
    async deleteMission(body) {
        await this.missionRepository.remove(body);
    }
    async updateMission(body) {
        return this.missionRepository.save(body);
    }
    async checkMission({ id }) {
        const mission = await this.getMissionById({ id });
        if (!mission) {
            throw new invalid_mission_id_exception_1.InvalidMissionIdException();
        }
        return mission;
    }
    async createMission(body) {
        const mission = await this.missionRepository.create(Object.assign({}, body));
        const newMission = await this.missionRepository.save(mission);
        return newMission;
    }
    async getMissionById({ id }) {
        return this.missionRepository.findOne({ where: { id } });
    }
    hasRefresh({ user, date }) {
        return (user === null || user === void 0 ? void 0 : user.refreshDate) === date;
    }
    getOldMission({ mission, }) {
        return mission && JSON.parse(mission);
    }
    isRefresh({ user, date }) {
        return !user.refreshDate || (!!user.refreshDate && user.refreshDate < date);
    }
    hasOldMissions({ mission, date, }) {
        var _a;
        return (mission === null || mission === void 0 ? void 0 : mission.date) === date && ((_a = mission === null || mission === void 0 ? void 0 : mission.missions) === null || _a === void 0 ? void 0 : _a.length) > 0;
    }
    async hasMissionInAnswer({ answer, date }) {
        var _a, _b;
        return (!!(answer === null || answer === void 0 ? void 0 : answer.date) &&
            !!((_a = answer === null || answer === void 0 ? void 0 : answer.mission) === null || _a === void 0 ? void 0 : _a.cycle) &&
            !!((_b = answer === null || answer === void 0 ? void 0 : answer.mission) === null || _b === void 0 ? void 0 : _b.id) &&
            date_1.getDateString({ date: answer.date, day: answer.mission.cycle }) >= date);
    }
    async getMissionsByNotInIdAndLimit({ ids, limit = 3, }) {
        return (this.missionRepository
            .createQueryBuilder('missions')
            .where(`id NOT IN (${ids.length > 0 ? ids.join(', ') : 0})`)
            .orderBy('RAND()')
            .limit(limit)
            .getMany());
    }
};
MissionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Mission_entity_1.Mission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MissionsService);
exports.MissionsService = MissionsService;
//# sourceMappingURL=missions.service.js.map