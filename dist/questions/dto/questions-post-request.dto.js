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
exports.QuestionsPostRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QuestionsPostRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { content: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: '너의 질문은?',
        description: '질문 내용을 작성해 주세요.',
        required: true,
    }),
    class_validator_1.IsString({ message: '필수 파라이터가 없습니다.' }),
    class_validator_1.IsNotEmpty({ message: '필수 파라이터가 없습니다.' }),
    __metadata("design:type", String)
], QuestionsPostRequestDto.prototype, "content", void 0);
exports.QuestionsPostRequestDto = QuestionsPostRequestDto;
//# sourceMappingURL=questions-post-request.dto.js.map