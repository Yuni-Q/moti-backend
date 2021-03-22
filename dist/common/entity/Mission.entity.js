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
exports.Mission = void 0;
const typeorm_1 = require("typeorm");
const Answer_entity_1 = require("./Answer.entity");
let Mission = class Mission extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Mission.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'title', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Mission.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'isContent', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], Mission.prototype, "isContent", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'isImage', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], Mission.prototype, "isImage", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'cycle', nullable: true }),
    __metadata("design:type", Number)
], Mission.prototype, "cycle", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], Mission.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", Date)
], Mission.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Answer_entity_1.Answer, (answers) => answers.mission),
    __metadata("design:type", Array)
], Mission.prototype, "answers", void 0);
Mission = __decorate([
    typeorm_1.Entity('missions', { schema: 'chocopie' })
], Mission);
exports.Mission = Mission;
//# sourceMappingURL=Mission.entity.js.map