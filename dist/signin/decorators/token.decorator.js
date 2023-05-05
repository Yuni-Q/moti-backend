"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const common_1 = require("@nestjs/common");
const require_token_exception_1 = require("../../common/exception/require.token.exception");
exports.Token = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    let token = request.headers.authorization;
    if (!token) {
        throw new require_token_exception_1.RequireTokenException();
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    return token;
});
//# sourceMappingURL=token.decorator.js.map