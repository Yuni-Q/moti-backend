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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_entity_1 = require("../common/entity/User.entity");
const custom_interval_server_error_exception_1 = require("../common/exception/custom.interval.server.error.exception");
const invalid_token_exception_1 = require("../common/exception/invalid.token.exception");
const require_body_exception_1 = require("../common/exception/require.body.exception");
const require_token_exception_1 = require("../common/exception/require.token.exception");
const transformInterceptor_interceptor_1 = require("../common/interceptors/transformInterceptor.interceptor");
const invalid_user_id_dto_1 = require("../users/exception/invalid.user.id.dto");
const users_service_1 = require("../users/users.service");
const token_decorator_1 = require("./decorators/token.decorator");
const valid_body_1 = require("./decorators/valid.body");
const signin_request_dto_1 = require("./dto/signin.request.dto");
const signin_response_dto_1 = require("./dto/signin.response.dto");
const valid_token_exception_1 = require("./exception/valid.token.exception");
const signin_service_1 = require("./signin.service");
let SigninController = class SigninController {
    constructor(SigninService, usersService) {
        this.SigninService = SigninService;
        this.usersService = usersService;
    }
    async refresh(token) {
        try {
            const result = jsonwebtoken_1.default.verify(token, process.env.privateKey);
            if (!(result === null || result === void 0 ? void 0 : result.snsType) || !(result === null || result === void 0 ? void 0 : result.snsId)) {
                throw new invalid_token_exception_1.InvalidTokenException();
            }
            const user = await this.usersService.getUserBySnsIdAndSnsType(result);
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                throw new invalid_user_id_dto_1.InvalidUserIdException();
            }
            const { accessToken, refreshToken, } = await this.SigninService.createToken(user);
            const signUp = !!user.name && !!user.birthday && !!user.email && !!user.gender;
            return {
                status: common_1.HttpStatus.CREATED,
                data: { accessToken, refreshToken, signUp },
            };
        }
        catch (error) {
            console.log('token', token);
            console.log(error);
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async signin(token, body) {
        try {
            const { snsType } = body;
            let snsId, email;
            if (snsType === 'apple' || snsType === 'google') {
                const snsData = await this.SigninService.jwtDecode(token);
                snsId = snsData.sub;
                email = snsData.email;
            }
            else if (snsType === 'web') {
                const snsData = await this.SigninService.jwtOauth2(token);
                snsId = snsData.data.id;
                email = snsData.data.email;
            }
            else {
                throw new require_body_exception_1.RequireBodyException();
            }
            if (!email || !snsId) {
                throw new valid_token_exception_1.ValidTokenException();
            }
            const user = await this.usersService.getUserBySnsIdAndSnsType({
                snsId,
                snsType: snsType === 'web' ? 'google' : snsType,
            });
            const signUp = !user ? false : !!user.name ? true : false;
            const newUser = user
                ? user
                : await this.usersService.createUser({ snsId, snsType, email });
            const { accessToken, refreshToken, } = await this.SigninService.createToken(newUser);
            return {
                status: common_1.HttpStatus.CREATED,
                data: { accessToken, refreshToken, signUp },
            };
        }
        catch (error) {
            console.log('token', token);
            console.log(error);
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
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
        status: new require_token_exception_1.RequireTokenException().statusCode,
        type: require_token_exception_1.RequireTokenException,
        description: new require_token_exception_1.RequireTokenException().message,
    }),
    swagger_1.ApiTags('signin'),
    common_1.Controller('api/v1/signin'),
    __metadata("design:paramtypes", [signin_service_1.SigninService,
        users_service_1.UsersService])
], SigninController);
exports.SigninController = SigninController;
//# sourceMappingURL=signin.controller.js.map