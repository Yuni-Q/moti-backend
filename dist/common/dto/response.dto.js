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
exports.ResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const status = common_1.HttpStatus.OK;
class ResponseDto {
    constructor() {
        this.message = '';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, type: () => Number }, statusCode: { required: false, type: () => Number }, message: { required: false, type: () => Object, default: '' } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: status,
        description: 'http 상태 코드',
        required: true,
    }),
    __metadata("design:type", Number)
], ResponseDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: status,
        description: 'custom 상태 코드',
        required: true,
    }),
    __metadata("design:type", Number)
], ResponseDto.prototype, "statusCode", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '',
        description: '에러 메시지',
        required: true,
    }),
    __metadata("design:type", Object)
], ResponseDto.prototype, "message", void 0);
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map