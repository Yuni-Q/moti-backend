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
exports.DeleteFileDto = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const status = common_1.HttpStatus.OK;
const message = '파일을 삭제 했습니다.';
const data = null;
class DeleteFileDto extends response_dto_1.ResponseDto {
    constructor() {
        super(...arguments);
        this.status = status;
        this.message = message;
        this.data = data;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, type: () => Number, default: status }, message: { required: false, type: () => Object, default: message }, data: { required: true, type: () => Object, default: data } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: status,
        description: '상태 코드',
        required: true,
    }),
    __metadata("design:type", Number)
], DeleteFileDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: message,
        description: '에러 메시지',
        required: true,
    }),
    __metadata("design:type", Object)
], DeleteFileDto.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: data,
        description: 'null을 return 합니다.',
        required: true,
    }),
    __metadata("design:type", Object)
], DeleteFileDto.prototype, "data", void 0);
exports.DeleteFileDto = DeleteFileDto;
//# sourceMappingURL=delete-file.dto.js.map