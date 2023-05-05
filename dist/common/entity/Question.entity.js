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
exports.Question = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Question = class Question {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, content: { required: true, type: () => String, nullable: true }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    swagger_1.ApiProperty({
        example: 1,
        description: '유니크한 값 입니다.',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '내용입니다.',
        description: '질문 내용 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('varchar', { name: 'content', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '데이터 생성일 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '데이터 수정일 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", Date)
], Question.prototype, "updatedAt", void 0);
Question = __decorate([
    typeorm_1.Entity('questions', { schema: 'chocopie' })
], Question);
exports.Question = Question;
//# sourceMappingURL=Question.entity.js.map