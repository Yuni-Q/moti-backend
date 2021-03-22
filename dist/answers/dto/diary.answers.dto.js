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
exports.DiaryAnswersDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const Answer_entity_1 = require("../../common/entity/Answer.entity");
const Mission_entity_1 = require("../../common/entity/Mission.entity");
class DiaryAnswersDto extends response_dto_1.ResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: {
            lastId: 3420,
            direction: 1,
            limit: 10,
            answers: [
                {
                    id: 3788,
                    imageUrl: null,
                    content: '',
                    date: '2021-01-17',
                    setDate: '2021-01-17',
                    no: 2,
                    createdAt: '2021-01-17 22:23:39',
                    updatedAt: '2021-01-17 22:23:39',
                    missionId: 3,
                    fileId: 37,
                    userId: 119,
                    mission: {
                        id: 3,
                        title: '지금 떠오르는 내가 좋아하는 것 5가지만 이야기 해보아요.',
                        isContent: true,
                        isImage: false,
                        cycle: 14,
                        createdAt: '2020-04-01 14:14:17',
                        updatedAt: '2020-04-01 14:14:17',
                    },
                },
            ],
        },
        description: '답변 조회',
        required: true,
    }),
    __metadata("design:type", Object)
], DiaryAnswersDto.prototype, "data", void 0);
exports.DiaryAnswersDto = DiaryAnswersDto;
//# sourceMappingURL=diary.answers.dto.js.map