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
exports.UserBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserBodyDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: '모티',
        description: '이름',
        required: true,
    }),
    __metadata("design:type", String)
], UserBodyDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-03-18',
        description: '생일',
        required: true,
    }),
    __metadata("design:type", String)
], UserBodyDto.prototype, "birthday", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '남',
        description: '성별',
        required: true,
    }),
    __metadata("design:type", String)
], UserBodyDto.prototype, "gender", void 0);
exports.UserBodyDto = UserBodyDto;
//# sourceMappingURL=user.body.dto.js.map