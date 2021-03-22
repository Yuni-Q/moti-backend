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
exports.File = void 0;
const typeorm_1 = require("typeorm");
const Answer_entity_1 = require("./Answer.entity");
let File = class File extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'cardUrl', nullable: true, length: 255 }),
    __metadata("design:type", String)
], File.prototype, "cardUrl", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'part', nullable: true }),
    __metadata("design:type", Number)
], File.prototype, "part", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], File.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", Date)
], File.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'cardSvgUrl', nullable: true, length: 255 }),
    __metadata("design:type", String)
], File.prototype, "cardSvgUrl", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'cardPngUrl', nullable: true, length: 255 }),
    __metadata("design:type", String)
], File.prototype, "cardPngUrl", void 0);
__decorate([
    typeorm_1.OneToMany(() => Answer_entity_1.Answer, (answers) => answers.file),
    __metadata("design:type", Array)
], File.prototype, "answers", void 0);
File = __decorate([
    typeorm_1.Entity('files', { schema: 'chocopie' })
], File);
exports.File = File;
//# sourceMappingURL=File.entity.js.map