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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const id_decorator_1 = require("../common/decorators/id.decorator");
const token_user_id_decorator_1 = require("../common/decorators/token-user-id.decorator");
const User_entity_1 = require("../common/entity/User.entity");
const custom_interval_server_error_exception_1 = require("../common/exception/custom.interval.server.error.exception");
const require_body_exception_1 = require("../common/exception/require.body.exception");
const require_token_exception_1 = require("../common/exception/require.token.exception");
const transformInterceptor_interceptor_1 = require("../common/interceptors/transformInterceptor.interceptor");
const image_uploader_decorator_1 = require("../common/decorators/image-uploader.decorator");
const query_number_validation_pipe_1 = require("../common/pipe/query-number.validation.pipe");
const delete_user_dto_1 = require("./dto/delete-user.dto");
const user_body_dto_1 = require("./dto/user-body.dto");
const user_dto_1 = require("./dto/user.dto");
const users_dto_1 = require("./dto/users.dto");
const invalid_user_id_dto_1 = require("./exception/invalid-user-id.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getAll(userId, id) {
        try {
            const users = await this.usersService.getAll(id);
            return { data: users };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async getMyInfo(userId) {
        try {
            const user = await this.usersService.getUserById({ id: userId });
            return { data: user };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async getUserInfo(userId, id) {
        try {
            const user = await this.usersService.getUserById({ id });
            return { data: user };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async updateUser(userId, body) {
        try {
            const user = await this.usersService.checkUser({ id: userId });
            const newUser = Object.assign(Object.assign({}, user), body);
            const returnUser = await this.usersService.updateMyInfo(newUser);
            return { data: returnUser };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async resetRefreshDate(userId) {
        try {
            const user = await this.usersService.checkUser({ id: userId });
            const newUser = Object.assign(Object.assign({}, user), { refreshDate: null });
            const returnUser = await this.usersService.updateMyInfo(newUser);
            return { data: returnUser };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async deleteUser(userId) {
        try {
            const user = await this.usersService.checkUser({ id: userId });
            await this.usersService.deleteUser(user);
            return { data: null };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
    async updateProfileUrl(userId, body) {
        try {
            const { file: profileUrl } = body;
            const user = await this.usersService.checkUser({ id: userId });
            const newUser = Object.assign(Object.assign({}, user), { profileUrl: profileUrl });
            const returnUser = await this.usersService.updateMyInfo(newUser);
            return { data: returnUser };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message, error.status, error.statusCode);
        }
    }
};
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: users_dto_1.UsersDto,
        description: '성공',
    }),
    swagger_1.ApiOperation({ summary: '유저 정보 조회' }),
    swagger_1.ApiQuery({
        name: 'id',
        required: false,
        description: 'id',
    }),
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: require("./dto/users.dto").UsersDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, common_1.Query('id', new query_number_validation_pipe_1.QueryNumberValidationPipe(0))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    swagger_1.ApiResponse({
        status: 200,
        type: user_dto_1.UserDto,
        description: '성공',
    }),
    swagger_1.ApiOperation({ summary: '내 정보 조회' }),
    common_1.Get('my'),
    openapi.ApiResponse({ status: 200, type: require("./dto/user.dto").UserDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMyInfo", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: user_dto_1.UserDto,
        description: '성공',
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'path',
    }),
    swagger_1.ApiOperation({ summary: '특정 정보 조회' }),
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/user.dto").UserDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserInfo", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: user_dto_1.UserDto,
        description: '성공',
    }),
    swagger_1.ApiResponse({
        status: new invalid_user_id_dto_1.InvalidUserIdException().statusCode,
        type: invalid_user_id_dto_1.InvalidUserIdException,
        description: new invalid_user_id_dto_1.InvalidUserIdException().message,
    }),
    swagger_1.ApiResponse({
        status: new require_body_exception_1.RequireBodyException().statusCode,
        type: require_body_exception_1.RequireBodyException,
        description: new require_body_exception_1.RequireBodyException().message,
    }),
    swagger_1.ApiBody({
        type: user_body_dto_1.UserBodyDto,
        required: true,
        description: 'body',
    }),
    swagger_1.ApiOperation({ summary: '내 정보 수정' }),
    common_1.Put(''),
    openapi.ApiResponse({ status: 200, type: require("./dto/user.dto").UserDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_body_dto_1.UserBodyDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: user_dto_1.UserDto,
        description: '성공',
    }),
    swagger_1.ApiResponse({
        status: new invalid_user_id_dto_1.InvalidUserIdException().statusCode,
        type: invalid_user_id_dto_1.InvalidUserIdException,
        description: new invalid_user_id_dto_1.InvalidUserIdException().message,
    }),
    swagger_1.ApiOperation({ summary: 'refreshDate 초기화' }),
    common_1.Put('refresh'),
    openapi.ApiResponse({ status: 200, type: require("./dto/user.dto").UserDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetRefreshDate", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: delete_user_dto_1.DeleteUserDto,
        description: '성공',
    }),
    swagger_1.ApiResponse({
        status: new invalid_user_id_dto_1.InvalidUserIdException().statusCode,
        type: invalid_user_id_dto_1.InvalidUserIdException,
        description: new invalid_user_id_dto_1.InvalidUserIdException().message,
    }),
    swagger_1.ApiOperation({ summary: '유저 삭제' }),
    common_1.Delete(''),
    openapi.ApiResponse({ status: 200, type: require("./dto/delete-user.dto").DeleteUserDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: user_dto_1.UserDto,
        description: '프로필 필드 변경 성공',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiBody({
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    swagger_1.ApiResponse({
        status: new invalid_user_id_dto_1.InvalidUserIdException().statusCode,
        type: invalid_user_id_dto_1.InvalidUserIdException,
        description: new invalid_user_id_dto_1.InvalidUserIdException().message,
    }),
    swagger_1.ApiOperation({ summary: '프로필 이미지 업로드' }),
    common_1.Put('my/profile'),
    openapi.ApiResponse({ status: 200, type: require("./dto/user.dto").UserDto }),
    __param(0, token_user_id_decorator_1.TokenUserId()),
    __param(1, image_uploader_decorator_1.ImageUploader('profile')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfileUrl", null);
UsersController = __decorate([
    common_1.UseInterceptors(transformInterceptor_interceptor_1.TransformInterceptor),
    swagger_1.ApiBearerAuth('authorization'),
    swagger_1.ApiResponse({
        status: new require_token_exception_1.RequireTokenException().statusCode,
        type: require_token_exception_1.RequireTokenException,
        description: new require_token_exception_1.RequireTokenException().message,
    }),
    swagger_1.ApiTags('users'),
    common_1.Controller('api/v1/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map