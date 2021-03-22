"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const answers_service_1 = require("../answers/answers.service");
const Answer_entity_1 = require("../common/entity/Answer.entity");
const File_entity_1 = require("../common/entity/File.entity");
const Mission_entity_1 = require("../common/entity/Mission.entity");
const User_entity_1 = require("../common/entity/User.entity");
const files_service_1 = require("../files/files.service");
const users_service_1 = require("../users/users.service");
const missions_controller_1 = require("./missions.controller");
const missions_service_1 = require("./missions.service");
let MissionsModule = class MissionsModule {
};
MissionsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([Mission_entity_1.Mission, User_entity_1.User, Answer_entity_1.Answer, File_entity_1.File])],
        controllers: [missions_controller_1.MissionsController],
        providers: [missions_service_1.MissionsService, answers_service_1.AnswersService, users_service_1.UsersService, files_service_1.FilesService],
    })
], MissionsModule);
exports.MissionsModule = MissionsModule;
//# sourceMappingURL=missions.module.js.map