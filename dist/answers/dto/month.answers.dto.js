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
exports.MonthAnswersDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const Answer_entity_1 = require("../../common/entity/Answer.entity");
class MonthAnswers {
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => String }, monthAnswer: { required: true, type: () => [[require("../../common/entity/Answer.entity").Answer]] } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: '2020-09-01',
    }),
    __metadata("design:type", String)
], MonthAnswers.prototype, "date", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: 'array',
        items: {
            type: 'array',
            items: {
                $ref: swagger_1.getSchemaPath(Answer_entity_1.Answer),
            },
        },
    }),
    __metadata("design:type", Array)
], MonthAnswers.prototype, "monthAnswer", void 0);
class MonthAnswersDto extends response_dto_1.ResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => MonthAnswers } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        type: MonthAnswers,
    }),
    __metadata("design:type", MonthAnswers)
], MonthAnswersDto.prototype, "data", void 0);
exports.MonthAnswersDto = MonthAnswersDto;
//# sourceMappingURL=month.answers.dto.js.map