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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const Mission_entity_1 = require("../../common/entity/Mission.entity");
class Missions {
    static _OPENAPI_METADATA_FACTORY() {
        return { refresh: { required: true, type: () => Boolean }, missions: { required: true, type: () => [require("../../common/entity/Mission.entity").Mission] } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: true,
        description: '미션 갱신 가능 여부',
    }),
    __metadata("design:type", Boolean)
], Missions.prototype, "refresh", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: swagger_1.OmitType(Mission_entity_1.Mission, ['answers']),
        isArray: true,
    }),
    __metadata("design:type", Array)
], Missions.prototype, "missions", void 0);
class MissionsDto extends response_dto_1.ResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => Missions } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        type: Missions,
    }),
    __metadata("design:type", Missions)
], MissionsDto.prototype, "data", void 0);
exports.MissionsDto = MissionsDto;
//# sourceMappingURL=missions.dto.js.map