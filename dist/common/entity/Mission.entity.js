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
exports.OmitMission = exports.Mission = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Answer_entity_1 = require("./Answer.entity");
let Mission = class Mission {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, title: { required: true, type: () => String, nullable: true }, isContent: { required: true, type: () => Boolean, nullable: true }, isImage: { required: true, type: () => Boolean, nullable: true }, cycle: { required: true, type: () => Number, nullable: true }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, answers: { required: true, type: () => [require("./Answer.entity").Answer] } };
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
], Mission.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '질문',
        description: '질문 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('varchar', { name: 'title', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Mission.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'true',
        description: '질문에 내용이 필수인지 입니다.',
    }),
    class_validator_1.IsBoolean(),
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Mission.prototype, "isContent", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'true',
        description: '질문에 이미지가 필수인지 입니다.',
    }),
    class_validator_1.IsBoolean(),
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Mission.prototype, "isImage", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '30',
        description: '질문의 최소 반복 주기 입니다.',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column('int', { name: 'cycle', nullable: true }),
    __metadata("design:type", Number)
], Mission.prototype, "cycle", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '데이터 생성일 입니다.',
    }),
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], Mission.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '데이터 수정일 입니다.',
    }),
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", Date)
], Mission.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Answer_entity_1.Answer,
        isArray: true,
    }),
    typeorm_1.OneToMany(() => Answer_entity_1.Answer, (answers) => answers.mission),
    __metadata("design:type", Array)
], Mission.prototype, "answers", void 0);
Mission = __decorate([
    typeorm_1.Entity('missions', { schema: 'chocopie' })
], Mission);
exports.Mission = Mission;
class OmitMission extends swagger_1.OmitType(Mission, ['answers']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.OmitMission = OmitMission;
//# sourceMappingURL=Mission.entity.js.map