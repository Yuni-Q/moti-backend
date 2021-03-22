"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./common/database/database.module");
const env_module_1 = require("./common/env/env.module");
const logger_middleware_1 = require("./common/middlewares/logger.middleware");
const users_module_1 = require("./users/users.module");
const signin_module_1 = require("./signin/signin.module");
const questions_module_1 = require("./questions/questions.module");
const missions_module_1 = require("./missions/missions.module");
const answers_module_1 = require("./answers/answers.module");
const files_module_1 = require("./files/files.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            users_module_1.UsersModule,
            database_module_1.DatabaseModule,
            env_module_1.EnvModule,
            signin_module_1.SigninModule,
            questions_module_1.QuestionsModule,
            missions_module_1.MissionsModule,
            answers_module_1.AnswersModule,
            files_module_1.FilesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map