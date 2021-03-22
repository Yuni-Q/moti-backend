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
exports.UsersDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const User_entity_1 = require("../../common/entity/User.entity");
class UsersDto extends response_dto_1.ResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: [
            {
                id: 1,
                birthday: '2020-03-18',
                email: 'moti@gmail.com',
                name: '모티',
                gender: '여',
                refreshDate: null,
                refreshToken: null,
                mission: null,
                snsId: '1',
                snsType: 'google',
                createdAt: '2020-03-19T15:27:18.000Z',
                updatedAt: '2020-03-19T15:27:18.000Z',
            },
        ],
        description: '유저 정보 배열',
        required: true,
    }),
    __metadata("design:type", Array)
], UsersDto.prototype, "data", void 0);
exports.UsersDto = UsersDto;
//# sourceMappingURL=users.dto.js.map