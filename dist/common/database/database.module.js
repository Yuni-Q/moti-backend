"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Answer_entity_1 = require("../entity/Answer.entity");
const File_entity_1 = require("../entity/File.entity");
const Mission_entity_1 = require("../entity/Mission.entity");
const Question_entity_1 = require("../entity/Question.entity");
const User_entity_1 = require("../entity/User.entity");
const env_module_1 = require("../env/env.module");
const env_service_1 = require("../env/env.service");
function DatabaseOrmModule() {
    const config = new env_service_1.EnvService().read();
    return typeorm_1.TypeOrmModule.forRoot(process.env.NODE_ENV !== 'test'
        ? {
            name: 'default',
            type: 'mysql',
            host: config.DB_HOST,
            port: 3306,
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DATABASE,
            synchronize: false,
            logging: true,
            timezone: '+09:00',
            entities: [User_entity_1.User, Answer_entity_1.Answer, File_entity_1.File, Mission_entity_1.Mission, Question_entity_1.Question],
        }
        : {
            keepConnectionAlive: true,
            type: 'sqlite',
            database: 'moti',
            logging: false,
            verboseRetryLog: false,
            synchronize: true,
            entities: [User_entity_1.User, Answer_entity_1.Answer, File_entity_1.File, Mission_entity_1.Mission, Question_entity_1.Question],
        });
}
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [env_module_1.EnvModule, DatabaseOrmModule()],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map