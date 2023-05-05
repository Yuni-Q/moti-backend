"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        var _a, _b, _c;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const err = exception.getResponse();
        if (status === 403) {
            err.statusCode = 1100;
            err.message = '올바르지 못한 토큰 입니다.';
        }
        if (err.message instanceof Array) {
            return response.status(status).json({
                status: common_1.HttpStatus.PRECONDITION_FAILED,
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                message: err.message[0],
                data: (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.data,
            });
        }
        if (err.message) {
            return response.status(status).json({
                status: err.statusCode || status,
                statusCode: err.statusCode || status,
                message: err.message,
                data: (_b = err === null || err === void 0 ? void 0 : err.data) === null || _b === void 0 ? void 0 : _b.data,
            });
        }
        response.status(status).json({
            status: err.statusCode || status,
            statusCode: err.statusCode || status,
            message: err,
            data: (_c = err === null || err === void 0 ? void 0 : err.data) === null || _c === void 0 ? void 0 : _c.data,
        });
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map