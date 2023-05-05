"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginGuard = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../entity/User.entity");
let LoginGuard = class LoginGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let token = request.headers.authorization;
        if (!token) {
            return false;
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }
        let result;
        try {
            result = (await jsonwebtoken_1.default.verify(token, process.env.privateKey));
        }
        catch (e) {
            console.log('token.user.id.decorator token1', token);
            console.log(e);
            return false;
        }
        if (typeof result === 'object' && (!('user' in result) || !result.user.id)) {
            console.log('token.user.id.decorator token2', token);
            return false;
        }
        const user = await typeorm_1.getRepository(User_entity_1.User).findOne({ where: { id: result.user.id } });
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return false;
        }
        return true;
    }
};
LoginGuard = __decorate([
    common_1.Injectable()
], LoginGuard);
exports.LoginGuard = LoginGuard;
//# sourceMappingURL=login.guard.js.map