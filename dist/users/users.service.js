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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Mission_entity_1 = require("../common/entity/Mission.entity");
const User_entity_1 = require("../common/entity/User.entity");
const date_1 = require("../common/util/date");
const typeorm_2 = require("typeorm");
const invalid_user_id_dto_1 = require("./dto/invalid.user.id.dto");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(body) {
        const user = await this.userRepository.create(Object.assign({}, body));
        const newUser = this.userRepository.save(user);
        return newUser;
    }
    async getAll(id) {
        const users = await this.userRepository.find({
            where: {
                id: typeorm_2.MoreThan(parseInt(id, 10) || 0),
            },
            take: 10,
        });
        return users;
    }
    async get(id) {
        const user = await this.userRepository.findOne({
            where: {
                id: id,
            },
        });
        return user;
    }
    async getUserBySnsIdAndSnsType({ snsId, snsType, }) {
        const user = await this.userRepository.findOne({
            where: { snsId, snsType },
        });
        return user;
    }
    async updateMyInfo(id, body) {
        const user = await this.checkUser(id);
        const newUser = Object.assign(Object.assign({}, user), body);
        await this.userRepository.save(newUser);
        const returnUser = await this.get(id);
        return returnUser;
    }
    async deleteUser(id) {
        const user = await this.checkUser(id);
        await this.userRepository.remove(user);
        return null;
    }
    async checkUser(id) {
        const user = await this.get(id);
        if (!user) {
            throw new common_1.HttpException(new invalid_user_id_dto_1.InvalidUserIdDto(), common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async setMissionsInUser({ missions, id, }) {
        const date = date_1.getDateString({});
        const user = await this.checkUser(id);
        const newUser = Object.assign(Object.assign({}, user), { mission: JSON.stringify({ date, missions }) });
        const returnUser = await this.userRepository.save(newUser);
        return returnUser;
    }
    async setMissionsAndRefreshDateInUser({ id, missions, }) {
        const date = date_1.getDateString({});
        const user = await this.checkUser(id);
        const newUser = Object.assign(Object.assign({}, user), { refreshDate: date, mission: JSON.stringify({ date, missions }) });
        const returnUser = await this.userRepository.save(newUser);
        return returnUser;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(User_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map