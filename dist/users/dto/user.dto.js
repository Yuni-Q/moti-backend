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
exports.UserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const User_entity_1 = require("../../common/entity/User.entity");
class UserDto extends response_dto_1.ResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("../../common/entity/User.entity").User } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        type: swagger_1.OmitType(User_entity_1.User, ['answers']),
    }),
    __metadata("design:type", User_entity_1.User)
], UserDto.prototype, "data", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map