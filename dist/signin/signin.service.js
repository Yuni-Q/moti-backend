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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const invalid_token_dto_1 = require("../common/dto/invalid.token.dto");
const User_entity_1 = require("../common/entity/User.entity");
const invalid_user_id_dto_1 = require("../users/dto/invalid.user.id.dto");
const users_service_1 = require("../users/users.service");
let SigninService = class SigninService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signin(token, snsType) {
        try {
            let snsId, email;
            if (snsType === 'apple' || snsType === 'google') {
                const snsData = process.env.NODE_ENV === 'test'
                    ? {
                        iss: 'https://appleid.apple.com',
                        aud: 'com.mashup.ahobsu.Ahobsu',
                        exp: 1581254790,
                        iat: 1581254190,
                        sub: '001813.71f97bef48324fb29451a33e05d2cf5d.0908',
                        c_hash: 'KB0W75zvIFEcY9zW-79uxQ',
                        email: 'j5vvd9xtrb@privaterelay.appleid.com',
                        email_verified: 'true',
                        is_private_email: 'true',
                        auth_time: 1581254190,
                    }
                    : (await jsonwebtoken_1.default.decode(token));
                snsId = snsData.sub;
                email = snsData.email;
            }
            else if (snsType === 'web') {
                const { data: snsData } = await axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
                snsId = snsData.id;
                email = snsData.email;
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'snsType가 잘못 되었습니다.',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!email || !snsId) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.PRECONDITION_FAILED,
                    message: '토큰에 필수 정보가 없습니다.',
                }, common_1.HttpStatus.PRECONDITION_FAILED);
            }
            const user = await this.usersService.getUserBySnsIdAndSnsType({
                snsId,
                snsType,
            });
            const signUp = !user ? false : !!user.name ? true : false;
            const newUser = user
                ? user
                : await this.usersService.createUser({ snsId, snsType, email });
            const { accessToken, refreshToken } = await this.createToken(newUser);
            return { accessToken, refreshToken, signUp };
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: e.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async refresh(token) {
        try {
            const result = jsonwebtoken_1.default.verify(token, process.env.privateKey);
            if (!(result === null || result === void 0 ? void 0 : result.snsType)) {
                throw new common_1.HttpException(new invalid_token_dto_1.InvalidTokenDto(), common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.usersService.getUserBySnsIdAndSnsType(result);
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                throw new common_1.HttpException(new invalid_user_id_dto_1.InvalidUserIdDto(), common_1.HttpStatus.BAD_REQUEST);
            }
            const { accessToken, refreshToken } = await this.createToken(user);
            const signUp = !!user.name && !!user.birthday && !!user.email && !!user.gender;
            return { accessToken, refreshToken, signUp };
        }
        catch (e) {
            throw new common_1.HttpException(new invalid_token_dto_1.InvalidTokenDto(), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createToken({ id, snsId, snsType, }) {
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
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], SigninService);
exports.SigninService = SigninService;
//# sourceMappingURL=signin.service.js.map