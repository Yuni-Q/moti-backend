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
const typeorm_1 = require("typeorm");
let Question = class Question extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'content', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", Date)
], Question.prototype, "updatedAt", void 0);
Question = __decorate([
    typeorm_1.Entity('questions', { schema: 'chocopie' })
], Question);
exports.Question = Question;
//# sourceMappingURL=Question.entity.js.map