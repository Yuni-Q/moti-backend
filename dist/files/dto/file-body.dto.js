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
exports.FileBodyDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FileBodyDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { part: { required: false, type: () => String }, file: { required: false, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: '1',
        description: '파츠 번호',
        required: false,
    }),
    class_validator_1.IsString({ message: '올바른 값이 아닙니다.' }),
    __metadata("design:type", String)
], FileBodyDto.prototype, "part", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'https://cdn.moti.company/J9smJXN7.pdf',
        description: '파츠 이미지 url',
        required: false,
    }),
    class_validator_1.IsString({ message: '올바른 값이 아닙니다.' }),
    __metadata("design:type", String)
], FileBodyDto.prototype, "file", void 0);
exports.FileBodyDto = FileBodyDto;
//# sourceMappingURL=file-body.dto.js.map