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
exports.FileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const File_entity_1 = require("../../common/entity/File.entity");
class FileDto extends response_dto_1.ResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: {
            id: 73,
            cardUrl: 'https://cdn.moti.company/로고4 (1)_.jpg',
            part: 55,
            createdAt: null,
            updatedAt: null,
            cardSvgUrl: 'https://cdn.moti.company/yuniq.png',
            cardPngUrl: 'https://cdn.moti.company/yuniq.png',
        },
        description: '파일',
        required: true,
    }),
    __metadata("design:type", File_entity_1.File)
], FileDto.prototype, "data", void 0);
exports.FileDto = FileDto;
//# sourceMappingURL=file.dto.js.map