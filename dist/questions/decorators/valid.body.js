"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidBody = void 0;
const common_1 = require("@nestjs/common");
const require_body_dto_1 = require("../../common/dto/require.body.dto");
exports.ValidBody = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { content } = request.body;
    if (!content) {
        throw new common_1.HttpException(new require_body_dto_1.RequireBodyDto(), common_1.HttpStatus.PRECONDITION_FAILED);
    }
    return {
        content,
    };
});
//# sourceMappingURL=valid.body.js.map