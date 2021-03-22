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
exports.MissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const Mission_entity_1 = require("../../common/entity/Mission.entity");
class MissionDto extends response_dto_1.ResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: {
            id: 57,
            title: '당신이 불리고 싶은 별명은 무엇인가요?',
            isContent: 1,
            isImage: 0,
            cycle: 730,
            createdAt: '2021-02-17T14:08:53.000Z',
            updatedAt: '2021-02-17T14:08:53.000Z',
        },
        description: '미션 조회',
        required: true,
    }),
    __metadata("design:type", Mission_entity_1.Mission)
], MissionDto.prototype, "data", void 0);
exports.MissionDto = MissionDto;
//# sourceMappingURL=mission.dto.js.map