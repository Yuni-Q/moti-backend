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
exports.QueryNumberValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const invalid_query_exception_1 = require("../exception/invalid.query.exception");
let QueryNumberValidationPipe = class QueryNumberValidationPipe {
    constructor(value) {
        this.value = value;
    }
    transform(value, metadata) {
        if (!value) {
            return this.value;
        }
        const number = parseInt(value, 10);
        if (isNaN(number)) {
            throw new invalid_query_exception_1.InvalidQueryException();
        }
        return number;
    }
};
QueryNumberValidationPipe = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Number])
], QueryNumberValidationPipe);
exports.QueryNumberValidationPipe = QueryNumberValidationPipe;
//# sourceMappingURL=query-number.validation.pipe.js.map