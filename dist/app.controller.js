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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const token_decorator_1 = require("./common/decorators/token.decorator");
const sample_request_dto_1 = require("./common/dto/sample.request.dto");
const transformInterceptor_interceptor_1 = require("./common/interceptors/transformInterceptor.interceptor");
const undefined_interceptor_1 = require("./common/interceptors/undefined.interceptor");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return { data: this.appService.getHello() };
    }
    getHi(body, token) {
        return { data: 'bye' };
    }
};
__decorate([
    common_1.Get(),
    common_1.UseInterceptors(transformInterceptor_interceptor_1.TransformInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHello", null);
__decorate([
    swagger_1.ApiResponse({
        status: 200,
        type: sample_request_dto_1.SampleRequestDto,
        description: '성공',
    }),
    swagger_1.ApiResponse({
        status: 500,
        type: sample_request_dto_1.SampleRequestDto,
        description: '에러',
    }),
    swagger_1.ApiQuery({
        name: 'perPage',
        required: true,
        description: '쿼리 사용하기',
    }),
    swagger_1.ApiParam({
        name: 'url',
        required: true,
        description: 'path',
    }),
    swagger_1.ApiOperation({ summary: 'hi' }),
    common_1.Get('hi'),
    __param(0, common_1.Body()), __param(1, token_decorator_1.Token()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sample_request_dto_1.SampleRequestDto, Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHi", null);
AppController = __decorate([
    common_1.UseInterceptors(undefined_interceptor_1.UndefinedToNullInterceptor),
    swagger_1.ApiTags('참고'),
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map