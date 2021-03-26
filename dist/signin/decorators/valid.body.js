"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidBody = void 0;
const common_1 = require("@nestjs/common");
const require_body_exception_1 = require("../../common/exception/require.body.exception");
exports.ValidBody = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { snsType } = request.body;
    if (!snsType) {
        throw new require_body_exception_1.RequireBodyException();
    }
    return {
        snsType,
    };
});
//# sourceMappingURL=valid.body.js.map