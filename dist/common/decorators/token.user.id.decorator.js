"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUserId = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const invalid_token_exception_1 = require("../exception/invalid.token.exception");
const require_token_exception_1 = require("../exception/require.token.exception");
exports.TokenUserId = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    let token = request.headers.authorization;
    if (!token) {
        throw new require_token_exception_1.RequireTokenException();
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    let result;
    try {
        result = (await jsonwebtoken_1.default.verify(token, process.env.privateKey));
    }
    catch (e) {
        console.log('token.user.id.decorator token1', token, e);
        throw new invalid_token_exception_1.InvalidTokenException();
    }
    if (typeof result === 'object' &&
        (!('user' in result) || !result.user.id)) {
        console.log('token.user.id.decorator token2', token);
        throw new invalid_token_exception_1.InvalidTokenException();
    }
    return result.user.id;
});
//# sourceMappingURL=token.user.id.decorator.js.map