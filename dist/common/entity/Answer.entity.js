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
exports.Answer = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const File_entity_1 = require("./File.entity");
const Mission_entity_1 = require("./Mission.entity");
const User_entity_1 = require("./User.entity");
let Answer = class Answer {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, imageUrl: { required: true, type: () => String, nullable: true }, content: { required: true, type: () => String, nullable: true }, date: { required: true, type: () => String, nullable: true }, setDate: { required: true, type: () => String, nullable: true }, no: { required: true, type: () => Number, nullable: true }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, missionId: { required: true, type: () => Number, nullable: true }, fileId: { required: true, type: () => Number, nullable: true }, userId: { required: true, type: () => Number, nullable: true }, mission: { required: true, type: () => require("./Mission.entity").Mission }, file: { required: true, type: () => require("./File.entity").File }, user: { required: true, type: () => require("./User.entity").User } };
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
], Answer.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'https://storage.moti.company/C3EWCyEU',
        description: '이미지가 없을 경우에는 null 입니다.',
    }),
    class_validator_1.IsString(),
    class_validator_1.IsEmpty(),
    typeorm_1.Column('varchar', { name: 'imageUrl', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Answer.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '답변 내용 입니다.',
        description: '답변 내용 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('text', { name: 'content', nullable: true }),
    __metadata("design:type", String)
], Answer.prototype, "content", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28',
        description: '답변날짜 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('varchar', { name: 'date', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Answer.prototype, "date", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28',
        description: '드림캐처 묶음 기준 날짜 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('varchar', { name: 'setDate', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Answer.prototype, "setDate", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '1',
        description: '드림캐처 묶음 번호 입니다.',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column('int', { name: 'no', nullable: true }),
    __metadata("design:type", Number)
], Answer.prototype, "no", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '데이터 생성일 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], Answer.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '데이터 수정일 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", Date)
], Answer.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '1',
        description: '답변에 연결된 미션 id 입니다.',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column('int', { name: 'missionId', nullable: true }),
    __metadata("design:type", Number)
], Answer.prototype, "missionId", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '1',
        description: '답변에 연결된 파일 id 입니다.',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column('int', { name: 'fileId', nullable: true }),
    __metadata("design:type", Number)
], Answer.prototype, "fileId", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '1',
        description: '답변에 연결된 유저 id 입니다.',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column('int', { name: 'userId', nullable: true }),
    __metadata("design:type", Number)
], Answer.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Mission_entity_1.OmitMission,
    }),
    class_validator_1.IsObject(),
    typeorm_1.ManyToOne(() => Mission_entity_1.Mission, (missions) => missions.answers, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn([{ name: 'missionId', referencedColumnName: 'id' }]),
    __metadata("design:type", Mission_entity_1.Mission)
], Answer.prototype, "mission", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: File_entity_1.OmitFile,
    }),
    class_validator_1.IsObject(),
    typeorm_1.ManyToOne(() => File_entity_1.File, (files) => files.answers, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn([{ name: 'fileId', referencedColumnName: 'id' }]),
    __metadata("design:type", File_entity_1.File)
], Answer.prototype, "file", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: User_entity_1.OmitUser,
    }),
    class_validator_1.IsObject(),
    typeorm_1.ManyToOne(() => User_entity_1.User, (users) => users.answers, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn([{ name: 'userId', referencedColumnName: 'id' }]),
    __metadata("design:type", User_entity_1.User)
], Answer.prototype, "user", void 0);
Answer = __decorate([
    typeorm_1.Index('missionId', ['missionId'], {}),
    typeorm_1.Index('fileId', ['fileId'], {}),
    typeorm_1.Index('userId', ['userId'], {}),
    typeorm_1.Entity('answers', { schema: 'chocopie' })
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=Answer.entity.js.map