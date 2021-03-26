"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidBody = void 0;
const common_1 = require("@nestjs/common");
const require_body_exception_1 = require("../../common/exception/require.body.exception");
exports.ValidBody = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { title, isContent, isImage, cycle } = request.body;
    if (!title ||
        (!isContent && isContent !== false) ||
        (!isImage && isImage !== false) ||
        !cycle) {
        throw new require_body_exception_1.RequireBodyException();
    }
    return {
        title,
        isContent,
        isImage,
        cycle,
    };
});
//# sourceMappingURL=valid.body.js.map