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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Answer_entity_1 = require("./Answer.entity");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'birthday', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'email', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'gender', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'refreshDate', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "refreshDate", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'refreshToken', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'mission', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "mission", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'snsId', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "snsId", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'snsType', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "snsType", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Answer_entity_1.Answer, (answers) => answers.user),
    __metadata("design:type", Array)
], User.prototype, "answers", void 0);
User = __decorate([
    typeorm_1.Entity('users', { schema: 'chocopie' })
], User);
exports.User = User;
//# sourceMappingURL=User.entity.js.map