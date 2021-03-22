exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 31:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mission = void 0;
const typeorm_1 = __webpack_require__(28);
const Answer_entity_1 = __webpack_require__(29);
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
    typeorm_1.Column({
        width: 1,
        transformer: { from: (v) => !!v.readInt8(0), to: (v) => v },
    }),
    __metadata("design:type", Boolean)
], Mission.prototype, "isContent", void 0);
__decorate([
    typeorm_1.Column({
        transformer: { from: (v) => !!v.readInt8(0), to: (v) => v },
    }),
    __metadata("design:type", Boolean)
], Mission.prototype, "isImage", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'cycle', nullable: true }),
    __metadata("design:type", Number)
], Mission.prototype, "cycle", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Mission.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime', name: 'updatedAt' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Mission.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Answer_entity_1.Answer, (answers) => answers.mission),
    __metadata("design:type", Array)
], Mission.prototype, "answers", void 0);
Mission = __decorate([
    typeorm_1.Entity('missions', { schema: 'chocopie' })
], Mission);
exports.Mission = Mission;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "73808f86eb3fb93e62cb"
/******/ 	})();
/******/ 	
/******/ }
;