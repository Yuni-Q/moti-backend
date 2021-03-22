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
exports.QuestionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const Question_entity_1 = require("../../common/entity/Question.entity");
class QuestionsDto extends response_dto_1.ResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: {
            questions: [
                {
                    id: 1,
                    content: '오늘 하루 감사한 일을 알려주세요.',
                    createdAt: '2021-01-24T10:15:30.000Z',
                    updatedAt: '2021-01-24T10:15:30.000Z',
                },
            ],
            questionTotalCount: 52,
        },
        description: '질문',
        required: true,
    }),
    __metadata("design:type", Object)
], QuestionsDto.prototype, "data", void 0);
exports.QuestionsDto = QuestionsDto;
//# sourceMappingURL=questions.dto.js.map