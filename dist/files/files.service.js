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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const File_entity_1 = require("../common/entity/File.entity");
const typeorm_2 = require("typeorm");
const invalid_file_id_dto_1 = require("./dto/invalid.file.id.dto");
let FilesService = class FilesService {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async getFileByPart(part) {
        return this.fileRepository
            .createQueryBuilder('files')
            .where(`part=${part}`)
            .orderBy('RAND()')
            .getOne();
    }
    async destroy(id) {
        try {
            const file = await this.checkFile(id);
            await this.fileRepository.remove(file);
            return null;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, body) {
        try {
            const file = await this.checkFile(id);
            const newFile = Object.assign(Object.assign({}, file), body);
            const returnFile = await this.fileRepository.save(newFile);
            return returnFile;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(body) {
        try {
            const file = await this.fileRepository.create(body);
            const newFile = await this.fileRepository.save(file);
            return newFile;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async checkFile(id) {
        const file = await this.fileRepository.findOne({ where: { id } });
        if (!file) {
            throw new common_1.HttpException(new invalid_file_id_dto_1.InvalidFileIdDto(), new invalid_file_id_dto_1.InvalidFileIdDto().status);
        }
        return file;
    }
};
FilesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(File_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map