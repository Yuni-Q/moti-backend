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
exports.DeleteUserDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const status = common_1.HttpStatus.OK;
const message = '유저를 삭제 했습니다.';
const data = null;
class DeleteUserDto extends response_dto_1.ResponseDto {
    constructor() {
        super(...arguments);
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: status,
        description: '상태 코드',
        required: true,
    }),
    __metadata("design:type", Object)
], DeleteUserDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: message,
        description: '에러 메시지',
        required: true,
    }),
    __metadata("design:type", Object)
], DeleteUserDto.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: data,
        description: 'null을 return 합니다.',
        required: true,
    }),
    __metadata("design:type", Object)
], DeleteUserDto.prototype, "data", void 0);
exports.DeleteUserDto = DeleteUserDto;
//# sourceMappingURL=delete.user.dto.js.map