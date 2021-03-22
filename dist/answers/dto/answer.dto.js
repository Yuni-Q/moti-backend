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
exports.AnswerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const Answer_entity_1 = require("../../common/entity/Answer.entity");
const Mission_entity_1 = require("../../common/entity/Mission.entity");
class AnswerDto extends response_dto_1.ResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: {
            id: 88,
            userId: 121,
            missionId: 1,
            fileId: 3,
            imageUrl: null,
            content: '335',
            date: '2020-02-28',
            setDate: '2020-02-27',
            createdAt: '2020-02-28 00:08:15',
            updatedAt: '2020-02-28 00:08:15',
            mission: {
                id: 1,
                title: '좋아하는 디저트가 있나요?',
                isContent: true,
                isImage: true,
                cycle: 3,
                createdAt: '2020-01-12 20:54:34',
                updatedAt: '2020-01-12 20:54:34',
            },
            file: {
                id: 3,
                cardUrl: 'https://cdn.moti.company/J9smJXN7.pdf',
                part: 3,
                createdAt: '2020-01-27 18:05:56',
                updatedAt: '2020-01-27 18:05:56',
            },
        },
        description: '답변 조회',
        required: true,
    }),
    __metadata("design:type", Answer_entity_1.Answer)
], AnswerDto.prototype, "data", void 0);
exports.AnswerDto = AnswerDto;
//# sourceMappingURL=answer.dto.js.map