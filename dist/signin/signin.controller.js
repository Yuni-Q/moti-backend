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
exports.SigninController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_token_dto_1 = require("../common/dto/require.token.dto");
const transformInterceptor_interceptor_1 = require("../common/interceptors/transformInterceptor.interceptor");
const token_decorator_1 = require("./decorators/token.decorator");
const valid_body_1 = require("./decorators/valid.body");
const signin_request_dto_1 = require("./dto/signin.request.dto");
const signin_response_dto_1 = require("./dto/signin.response.dto");
const signin_service_1 = require("./signin.service");
let SigninController = class SigninController {
    constructor(SigninService) {
        this.SigninService = SigninService;
    }
    async refresh(token) {
        const result = await this.SigninService.refresh(token);
        return { status: common_1.HttpStatus.CREATED, data: result };
    }
    async signin(token, body) {
        const result = await this.SigninService.signin(token, body.snsType);
        return { status: common_1.HttpStatus.CREATED, data: result };
    }
};
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: signin_response_dto_1.SigninResponseDto,
        description: '성공',
    }),
    swagger_1.ApiOperation({ summary: 'refresh token으로 로그인' }),
    common_1.Post('refresh'),
    __param(0, token_decorator_1.Token()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SigninController.prototype, "refresh", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: signin_response_dto_1.SigninResponseDto,
        description: '성공',
    }),
    swagger_1.ApiOperation({ summary: '로그인' }),
    swagger_1.ApiBody({
        type: signin_request_dto_1.SigninRequestDto,
        required: true,
        description: 'body',
    }),
    common_1.Post(''),
    __param(0, token_decorator_1.Token()),
    __param(1, valid_body_1.ValidBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, signin_request_dto_1.SigninRequestDto]),
    __metadata("design:returntype", Promise)
], SigninController.prototype, "signin", null);
SigninController = __decorate([
    common_1.UseInterceptors(transformInterceptor_interceptor_1.TransformInterceptor),
    swagger_1.ApiBearerAuth('authorization'),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: require_token_dto_1.RequireTokenDto,
        description: '토큰이 없습니다.',
    }),
    swagger_1.ApiTags('signin'),
    common_1.Controller('api/v1/signin'),
    __metadata("design:paramtypes", [signin_service_1.SigninService])
], SigninController);
exports.SigninController = SigninController;
//# sourceMappingURL=signin.controller.js.map