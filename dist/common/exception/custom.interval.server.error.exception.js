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
exports.CustomInternalServerErrorException = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const defaultStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
class CustomInternalServerErrorException extends common_1.HttpException {
    constructor(message, status, statusCode) {
        super({ status: status || statusCode || defaultStatus, statusCode: status || statusCode || defaultStatus, message }, status);
        this.statusCode = defaultStatus;
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: defaultStatus,
        description: '상태 코드',
        required: true,
    }),
    __metadata("design:type", Object)
], CustomInternalServerErrorException.prototype, "statusCode", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '알 수 없는 에러가 발생했습니다.',
        description: '에러 메시지',
        required: true,
    }),
    __metadata("design:type", Object)
], CustomInternalServerErrorException.prototype, "message", void 0);
exports.CustomInternalServerErrorException = CustomInternalServerErrorException;
//# sourceMappingURL=custom.interval.server.error.exception.js.map