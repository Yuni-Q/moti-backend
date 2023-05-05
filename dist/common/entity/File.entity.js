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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmitFile = exports.File = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Answer_entity_1 = require("./Answer.entity");
let File = class File {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, cardUrl: { required: true, type: () => String, nullable: true }, cardSvgUrl: { required: true, type: () => String, nullable: true }, cardPngUrl: { required: true, type: () => String, nullable: true }, cardPdfUrl: { required: true, type: () => String, nullable: true }, part: { required: true, type: () => Number, nullable: true }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, answers: { required: true, type: () => [require("./Answer.entity").Answer] } };
    }
};
__decorate([
    swagger_1.ApiProperty({
        example: 1,
        description: '유니크한 값입니다.',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'https://storage.moti.company/J9smJXN7.pdf',
        description: '드림캐처 파츠의 pdf 이미지 주소 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('varchar', { name: 'cardUrl', nullable: true, length: 255 }),
    __metadata("design:type", String)
], File.prototype, "cardUrl", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'https://storage.moti.company/J9smJXN7.svg',
        description: '드림캐처 파츠의 svg 이미지 주소 입니다.',
    }),
    typeorm_1.Column('varchar', { name: 'cardSvgUrl', nullable: true, length: 255 }),
    __metadata("design:type", String)
], File.prototype, "cardSvgUrl", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'https://storage.moti.company/J9smJXN7.png',
        description: '드림캐처 파츠의 png 이미지 주소 입니다.',
    }),
    typeorm_1.Column('varchar', { name: 'cardPngUrl', nullable: true, length: 255 }),
    __metadata("design:type", String)
], File.prototype, "cardPngUrl", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'https://storage.moti.company/J9smJXN7.pdf',
        description: '드림캐처 파츠의 pdf 이미지 주소 입니다.',
    }),
    typeorm_1.Column('varchar', { name: 'cardPdfUrl', nullable: true, length: 255 }),
    __metadata("design:type", String)
], File.prototype, "cardPdfUrl", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '1',
        description: '드림캐처 파츠의 구분 번호 입니다.',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column('int', { name: 'part', nullable: true }),
    __metadata("design:type", Number)
], File.prototype, "part", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '데이터 생성일 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], File.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '데이터 수정일 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", Date)
], File.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Answer_entity_1.Answer,
        isArray: true,
    }),
    typeorm_1.OneToMany(() => Answer_entity_1.Answer, (answers) => answers.file),
    __metadata("design:type", Array)
], File.prototype, "answers", void 0);
File = __decorate([
    typeorm_1.Entity('files', { schema: 'chocopie' })
], File);
exports.File = File;
class OmitFile extends swagger_1.OmitType(File, ['answers']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.OmitFile = OmitFile;
//# sourceMappingURL=File.entity.js.map