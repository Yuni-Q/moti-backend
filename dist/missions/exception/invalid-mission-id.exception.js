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
exports.InvalidMissionIdException = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const status = common_1.HttpStatus.BAD_REQUEST;
const message = '유효하지 않은 mission id 입니다.';
class InvalidMissionIdException extends common_1.HttpException {
    constructor() {
        super({ status, statusCode: status, message }, status);
        this.statusCode = status;
        this.message = message;
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: status,
        description: '상태 코드',
        required: true,
    }),
    __metadata("design:type", Object)
], InvalidMissionIdException.prototype, "statusCode", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: message,
        description: '에러 메시지',
        required: true,
    }),
    __metadata("design:type", Object)
], InvalidMissionIdException.prototype, "message", void 0);
exports.InvalidMissionIdException = InvalidMissionIdException;
//# sourceMappingURL=invalid-mission-id.exception.js.map