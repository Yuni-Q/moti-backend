"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvService = void 0;
const fs = __importStar(require("fs"));
const dotenv = __importStar(require("dotenv"));
class EnvService {
    constructor() {
        const environment = process.env.NODE_ENV || 'development';
        const data = dotenv.parse(fs.readFileSync(`.env`));
        data.APP_ENV = environment;
        data.PORT = parseInt(data.DB_PORT);
        this.vars = data;
    }
    read() {
        return this.vars;
    }
    isDev() {
        return this.vars.APP_ENV === 'development';
    }
    isProd() {
        return this.vars.APP_ENV === 'production';
    }
}
exports.EnvService = EnvService;
//# sourceMappingURL=env.service.js.map