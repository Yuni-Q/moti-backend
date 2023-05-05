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
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const Answer_entity_1 = require("../../common/entity/Answer.entity");
class DiaryAnswers {
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => String }, direction: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, answers: { required: true, type: () => [require("../../common/entity/Answer.entity").Answer] } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: '2021-01-18',
    }),
    __metadata("design:type", String)
], DiaryAnswers.prototype, "date", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 0,
    }),
    __metadata("design:type", Number)
], DiaryAnswers.prototype, "direction", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 10,
    }),
    __metadata("design:type", Number)
], DiaryAnswers.prototype, "limit", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Answer_entity_1.Answer, isArray: true }),
    __metadata("design:type", Array)
], DiaryAnswers.prototype, "answers", void 0);
class DiaryAnswersDto extends response_dto_1.ResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => DiaryAnswers } };
    }
}
__decorate([
    swagger_1.ApiProperty({ type: DiaryAnswers }),
    __metadata("design:type", DiaryAnswers)
], DiaryAnswersDto.prototype, "data", void 0);
exports.DiaryAnswersDto = DiaryAnswersDto;
//# sourceMappingURL=diary.answers.dto.js.map