"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = void 0;
const common_1 = require("@nestjs/common");
const require_id_exception_1 = require("../exception/require.id.exception");
exports.Id = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const id = parseInt(request.params.id, 10);
    if (isNaN(id)) {
        throw new require_id_exception_1.RequireIdException();
    }
    return id;
});
//# sourceMappingURL=id.decorator.js.map