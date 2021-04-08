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
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
require("reflect-metadata");
const app_module_1 = require("./app.module");
const Sentry = __importStar(require("@sentry/node"));
const sentry_interceptor_1 = require("./common/interceptors/sentry.interceptor");
async function bootstrap() {
    Sentry.init({
        dsn: process.env.DSN,
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalInterceptors(new sentry_interceptor_1.SentryInterceptor());
    const port = process.env.PORT || 8000;
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'authorization')
        .setTitle('API')
        .setDescription('개발을 위한 API 문서입니다.')
        .setVersion('1.0.0')
        .addCookieAuth('connect.id')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('apiDocs', app, document);
    await app.listen(port);
    console.log(`listening on port ${port}`);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map