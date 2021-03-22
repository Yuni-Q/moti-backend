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
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const Mission_entity_1 = require("../../common/entity/Mission.entity");
class MissionsDto extends response_dto_1.ResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: {
            refresh: true,
            missions: [
                {
                    id: 57,
                    title: '당신이 불리고 싶은 별명은 무엇인가요?',
                    isContent: true,
                    isImage: false,
                    cycle: 730,
                    createdAt: '2021-02-17T14:08:53.000Z',
                    updatedAt: '2021-02-17T14:08:53.000Z',
                },
                {
                    id: 22,
                    title: '최근 가장 가지고 싶은 물건이 있나요?',
                    isContent: true,
                    isImage: false,
                    cycle: 10,
                    createdAt: '2020-04-01T05:14:17.000Z',
                    updatedAt: '2020-04-01T05:14:17.000Z',
                },
                {
                    id: 36,
                    title: '어떤 일을 하고 싶었지만 못했던 일이 무엇인가요? 그리고 그것을 못했던 이유는 무엇일까요?',
                    isContent: true,
                    isImage: false,
                    cycle: 300,
                    createdAt: '2020-04-01T05:14:17.000Z',
                    updatedAt: '2020-04-01T05:14:17.000Z',
                },
            ],
        },
        description: '오늘의 미션 3가지와 미션 재발급 가능 여부',
        required: true,
    }),
    __metadata("design:type", Object)
], MissionsDto.prototype, "data", void 0);
exports.MissionsDto = MissionsDto;
//# sourceMappingURL=missions.dto.js.map