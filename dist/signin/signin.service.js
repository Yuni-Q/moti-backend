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
exports.SigninService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let SigninService = class SigninService {
    async jwtOauth2(token) {
        return axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
    }
    async jwtDecode(token) {
        return jsonwebtoken_1.default.decode(token);
    }
    async createToken({ id, snsId, snsType }) {
        const accessToken = await jsonwebtoken_1.default.sign({
            user: {
                id,
            },
        }, process.env.privateKey, { expiresIn: 7 * 24 * 60 * 60 });
        const refreshToken = await jsonwebtoken_1.default.sign({
            snsId,
            snsType,
        }, process.env.privateKey, { expiresIn: 30 * 24 * 60 * 60 });
        return { accessToken, refreshToken };
    }
};
SigninService = __decorate([
    common_1.Injectable()
], SigninService);
exports.SigninService = SigninService;
//# sourceMappingURL=signin.service.js.map