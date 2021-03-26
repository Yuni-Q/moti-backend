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
const invalid_file_id_exception_1 = require("./exception/invalid.file.id.exception");
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
    async deleteFile(file) {
        return this.fileRepository.remove(file);
    }
    async updateFile(body) {
        return this.fileRepository.save(body);
    }
    async create(body) {
        const file = await this.fileRepository.create(body);
        const newFile = await this.fileRepository.save(file);
        return newFile;
    }
    async checkFile({ id }) {
        const file = await this.fileRepository.findOne({ where: { id } });
        if (!file) {
            throw new invalid_file_id_exception_1.InvalidFileIdException();
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