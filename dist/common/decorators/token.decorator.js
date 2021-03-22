"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_entity_1 = require("../entity/User.entity");
const invalid_token_dto_1 = require("../dto/invalid.token.dto");
const require_token_dto_1 = require("../dto/require.token.dto");
exports.Token = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    let token = request.headers.authorization;
    if (!token) {
        throw new common_1.HttpException(new require_token_dto_1.RequireTokenDto(), common_1.HttpStatus.BAD_REQUEST);
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    let result;
    try {
        result = (await jsonwebtoken_1.default.verify(token, process.env.privateKey));
    }
    catch (e) {
        throw new common_1.HttpException(new invalid_token_dto_1.InvalidTokenDto(), common_1.HttpStatus.BAD_REQUEST);
    }
    if (typeof result === 'object' &&
        (!('user' in result) || !result.user.id)) {
        throw new common_1.HttpException(new invalid_token_dto_1.InvalidTokenDto(), common_1.HttpStatus.BAD_REQUEST);
    }
    return result.user;
});
//# sourceMappingURL=token.decorator.js.map