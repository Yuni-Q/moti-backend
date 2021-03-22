"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = void 0;
const common_1 = require("@nestjs/common");
const require_id_dto_1 = require("../dto/require.id.dto");
exports.Id = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const id = parseInt(request.params.id, 10);
    if (isNaN(id)) {
        throw new common_1.HttpException(new require_id_dto_1.RequireIdDto(), common_1.HttpStatus.PRECONDITION_FAILED);
    }
    return id;
});
//# sourceMappingURL=id.decorator.js.map