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
exports.MissionBodyDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class MissionBodyDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, isContent: { required: true, type: () => Boolean }, isImage: { required: true, type: () => Boolean }, cycle: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: '질문 제목',
        description: '질문 제목',
        required: true,
    }),
    class_validator_1.IsString({ message: '필수 파라이터가 없습니다.' }),
    class_validator_1.IsNotEmpty({ message: '필수 파라이터가 없습니다.' }),
    __metadata("design:type", String)
], MissionBodyDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: true,
        description: '글 포함 유무',
        required: true,
    }),
    class_validator_1.IsBoolean({ message: '필수 파라이터가 없습니다.' }),
    class_validator_1.IsNotEmpty({ message: '필수 파라이터가 없습니다.' }),
    __metadata("design:type", Boolean)
], MissionBodyDto.prototype, "isContent", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: false,
        description: '이미지 포함 유무',
        required: true,
    }),
    class_validator_1.IsBoolean({ message: '필수 파라이터가 없습니다.' }),
    class_validator_1.IsNotEmpty({ message: '필수 파라이터가 없습니다.' }),
    __metadata("design:type", Boolean)
], MissionBodyDto.prototype, "isImage", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 30,
        description: '질문 다시 묻지 않을 기간',
        required: true,
    }),
    class_validator_1.IsNumber({ allowNaN: false, allowInfinity: false }, { message: '필수 파라이터가 없습니다.' }),
    class_validator_1.IsNotEmpty({ message: '필수 파라이터가 없습니다.' }),
    __metadata("design:type", Number)
], MissionBodyDto.prototype, "cycle", void 0);
exports.MissionBodyDto = MissionBodyDto;
//# sourceMappingURL=mission-body.dto.js.map