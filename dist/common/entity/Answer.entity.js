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
const typeorm_1 = require("typeorm");
const File_entity_1 = require("./File.entity");
const Mission_entity_1 = require("./Mission.entity");
const User_entity_1 = require("./User.entity");
let Answer = class Answer extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Answer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'imageUrl', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Answer.prototype, "imageUrl", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'content', nullable: true }),
    __metadata("design:type", String)
], Answer.prototype, "content", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'date', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Answer.prototype, "date", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'setDate', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Answer.prototype, "setDate", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'no', nullable: true }),
    __metadata("design:type", Number)
], Answer.prototype, "no", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], Answer.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", Date)
], Answer.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'missionId', nullable: true }),
    __metadata("design:type", Number)
], Answer.prototype, "missionId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'fileId', nullable: true }),
    __metadata("design:type", Number)
], Answer.prototype, "fileId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'userId', nullable: true }),
    __metadata("design:type", Number)
], Answer.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Mission_entity_1.Mission, (missions) => missions.answers, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn([{ name: 'missionId', referencedColumnName: 'id' }]),
    __metadata("design:type", Mission_entity_1.Mission)
], Answer.prototype, "mission", void 0);
__decorate([
    typeorm_1.ManyToOne(() => File_entity_1.File, (files) => files.answers, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn([{ name: 'fileId', referencedColumnName: 'id' }]),
    __metadata("design:type", File_entity_1.File)
], Answer.prototype, "file", void 0);
__decorate([
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