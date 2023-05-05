"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Answer_entity_1 = require("../common/entity/Answer.entity");
const File_entity_1 = require("../common/entity/File.entity");
const Mission_entity_1 = require("../common/entity/Mission.entity");
const User_entity_1 = require("../common/entity/User.entity");
const files_service_1 = require("../files/files.service");
const missions_service_1 = require("../missions/missions.service");
const users_service_1 = require("../users/users.service");
const answers_controller_1 = require("./answers.controller");
const answers_service_1 = require("./answers.service");
let AnswersModule = class AnswersModule {
};
AnswersModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([Answer_entity_1.Answer, Mission_entity_1.Mission, File_entity_1.File, User_entity_1.User])],
        controllers: [answers_controller_1.AnswersController],
        providers: [answers_service_1.AnswersService, missions_service_1.MissionsService, files_service_1.FilesService, users_service_1.UsersService],
    })
], AnswersModule);
exports.AnswersModule = AnswersModule;
//# sourceMappingURL=answers.module.js.map