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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const id_decorator_1 = require("../common/decorators/id.decorator");
const image_uploade_live_name_decorator_1 = require("../common/decorators/image.uploade.live.name.decorator");
const custom_interval_server_error_exception_1 = require("../common/exception/custom.interval.server.error.exception");
const require_body_exception_1 = require("../common/exception/require.body.exception");
const transformInterceptor_interceptor_1 = require("../common/interceptors/transformInterceptor.interceptor");
const delete_file_dto_1 = require("./dto/delete.file.dto");
const file_dto_1 = require("./dto/file.dto");
const files_service_1 = require("./files.service");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async updateSvg(body, id) {
        try {
            const { file: cardSvgUrl, part: partString } = body;
            if (!cardSvgUrl || !partString) {
                throw new require_body_exception_1.RequireBodyException();
            }
            const part = partString
                ? parseInt(partString, 10)
                : parseInt(cardSvgUrl.split('.pdf')[0].split('_').pop(), 10);
            if (isNaN(part)) {
                throw new require_body_exception_1.RequireBodyException();
            }
            const file = await this.filesService.checkFile({ id });
            const returnFile = await this.filesService.updateFile(Object.assign(Object.assign({}, file), { cardSvgUrl,
                part }));
            return { data: returnFile };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async updatePdf(body, id) {
        try {
            const { file: cardUrl, part: partString } = body;
            if (!cardUrl || !partString) {
                throw new require_body_exception_1.RequireBodyException();
            }
            const part = partString
                ? parseInt(partString, 10)
                : parseInt(cardUrl.split('.pdf')[0].split('_').pop(), 10);
            if (isNaN(part)) {
                throw new require_body_exception_1.RequireBodyException();
            }
            const file = await this.filesService.checkFile({ id });
            const returnFile = await this.filesService.updateFile(Object.assign(Object.assign({}, file), { cardUrl,
                part }));
            return { data: returnFile };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async destroy(id) {
        try {
            const file = await this.filesService.checkFile({ id });
            await this.filesService.deleteFile(file);
            return { data: null, message: new delete_file_dto_1.DeleteFileDto().message };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
    async createFile(body) {
        try {
            const { file: cardUrl, part: partString } = body;
            if (!cardUrl || !partString) {
                throw new require_body_exception_1.RequireBodyException();
            }
            const part = partString
                ? parseInt(partString, 10)
                : parseInt(cardUrl.split('.pdf')[0].split('_').pop(), 10);
            if (isNaN(part)) {
                throw new require_body_exception_1.RequireBodyException();
            }
            const result = await this.filesService.create({ cardUrl, part });
            return { statusCode: common_1.HttpStatus.CREATED, data: result };
        }
        catch (error) {
            throw new custom_interval_server_error_exception_1.CustomInternalServerErrorException(error.message);
        }
    }
};
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: file_dto_1.FileDto,
        description: '성공',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiBody({
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                part: {
                    type: 'string',
                    format: 'string',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'id',
    }),
    common_1.Put(':id/svg'),
    __param(0, image_uploade_live_name_decorator_1.ImageUploaderLiveName()), __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "updateSvg", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: file_dto_1.FileDto,
        description: '성공',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiBody({
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                part: {
                    type: 'string',
                    format: 'string',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'id',
    }),
    common_1.Put(':id'),
    __param(0, image_uploade_live_name_decorator_1.ImageUploaderLiveName()), __param(1, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "updatePdf", null);
__decorate([
    swagger_1.ApiResponse({
        status: new delete_file_dto_1.DeleteFileDto().status,
        type: delete_file_dto_1.DeleteFileDto,
        description: new delete_file_dto_1.DeleteFileDto().message,
    }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        description: 'id',
    }),
    common_1.Delete(':id'),
    __param(0, id_decorator_1.Id()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "destroy", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: file_dto_1.FileDto,
        description: '성공',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiBody({
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                part: {
                    type: 'string',
                    format: 'string',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    common_1.Post(),
    __param(0, image_uploade_live_name_decorator_1.ImageUploaderLiveName()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "createFile", null);
FilesController = __decorate([
    common_1.UseInterceptors(transformInterceptor_interceptor_1.TransformInterceptor),
    swagger_1.ApiTags('files'),
    common_1.Controller('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map