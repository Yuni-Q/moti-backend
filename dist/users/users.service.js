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
const User_entity_1 = require("../common/entity/User.entity");
const typeorm_2 = require("typeorm");
const invalid_user_id_dto_1 = require("./exception/invalid.user.id.dto");
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
        return this.userRepository.find({
            where: {
                id: typeorm_2.MoreThan(id),
            },
            take: 10,
        });
    }
    async getUserById({ id }) {
        return this.userRepository.findOne({
            where: {
                id: id,
            },
        });
    }
    async getUserBySnsIdAndSnsType({ snsId, snsType, }) {
        const user = await this.userRepository.findOne({
            where: { snsId, snsType },
        });
        return user;
    }
    async updateMyInfo(body) {
        return this.userRepository.save(body);
    }
    async deleteUser(user) {
        return this.userRepository.remove(user);
    }
    async checkUser({ id }) {
        const user = await this.getUserById({ id });
        if (!user) {
            throw new invalid_user_id_dto_1.InvalidUserIdException();
        }
        return user;
    }
    async updateUser(body) {
        return this.userRepository.save(body);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(User_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map