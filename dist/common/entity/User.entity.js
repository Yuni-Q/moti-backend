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
exports.OmitUser = exports.User = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Answer_entity_1 = require("./Answer.entity");
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, birthday: { required: true, type: () => String, nullable: true }, email: { required: true, type: () => String, nullable: true }, name: { required: true, type: () => String, nullable: true }, gender: { required: true, type: () => String, nullable: true }, refreshDate: { required: true, type: () => String, nullable: true }, refreshToken: { required: true, type: () => String, nullable: true }, snsId: { required: true, type: () => String, nullable: true }, snsType: { required: true, type: () => String, nullable: true }, profileUrl: { required: true, type: () => String, nullable: true }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, mission: { required: true, type: () => String, nullable: true }, answers: { required: true, type: () => [require("./Answer.entity").Answer] } };
    }
};
__decorate([
    swagger_1.ApiProperty({
        example: '1',
        description: '유니크한 값입니다.',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-03-18',
        description: '유저의 생일 입니다.',
    }),
    class_validator_1.IsString({ message: 'birthday 값이 올바르지 않습니다.' }),
    typeorm_1.Column('varchar', { name: 'birthday', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "birthday", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'moti@gmail.com',
        description: '유저의 이메일 입니다.',
    }),
    class_validator_1.IsEmail(),
    typeorm_1.Column('varchar', { name: 'email', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '모티',
        description: '유저의 이름 입니다.',
    }),
    class_validator_1.IsString({ message: 'name 값이 올바르지 않습니다.' }),
    typeorm_1.Column('varchar', { name: 'name', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '남',
        description: '유저의 성별 입니다.',
    }),
    class_validator_1.IsString({ message: 'gender 값이 올바르지 않습니다.' }),
    typeorm_1.Column('varchar', { name: 'gender', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2021-03-22',
        description: '유저의 미션 새로고침 일자 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('varchar', { name: 'refreshDate', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "refreshDate", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'refreshToken',
        description: '유저의 refreshToken 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('varchar', { name: 'refreshToken', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    swagger_1.ApiProperty({
        enum: ['apple', 'google', 'web'],
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('varchar', { name: 'snsId', nullable: true, length: 255 }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], User.prototype, "snsId", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'apple',
        description: '유저의 snsId와 snsType 값의 합은 유니한 값 입니다.',
    }),
    typeorm_1.Column('varchar', { name: 'snsType', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "snsType", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'https://storage.moti.company/J9smJXN7',
        description: '유저의 프로필 이미지 주소 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('varchar', { name: 'profileUrl', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "profileUrl", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '데이터 생성일 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '데이터 수정일 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2020-02-28 00:08:15',
        description: '유저에게 할당 된 미션 입니다.',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column('text', { name: 'mission', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "mission", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Answer_entity_1.Answer,
        isArray: true,
    }),
    typeorm_1.OneToMany(() => Answer_entity_1.Answer, (answers) => answers.user),
    __metadata("design:type", Array)
], User.prototype, "answers", void 0);
User = __decorate([
    typeorm_1.Entity('users', { schema: 'chocopie' })
], User);
exports.User = User;
class OmitUser extends swagger_1.OmitType(User, ['answers']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.OmitUser = OmitUser;
//# sourceMappingURL=User.entity.js.map