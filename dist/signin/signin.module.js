"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("../common/entity/User.entity");
const users_service_1 = require("../users/users.service");
const signin_controller_1 = require("./signin.controller");
const signin_service_1 = require("./signin.service");
let SigninModule = class SigninModule {
};
SigninModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_entity_1.User])],
        controllers: [signin_controller_1.SigninController],
        providers: [signin_service_1.SigninService, users_service_1.UsersService],
    })
], SigninModule);
exports.SigninModule = SigninModule;
//# sourceMappingURL=signin.module.js.map