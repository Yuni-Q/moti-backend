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
exports.ViewsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const views_service_1 = require("./views.service");
let ViewsController = class ViewsController {
    constructor(viewsService) {
        this.viewsService = viewsService;
    }
    static(req, res) {
        const app = this.viewsService.getNextServer();
        const handle = app.getRequestHandler();
        handle(req, res);
    }
};
__decorate([
    common_1.Get('*'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ViewsController.prototype, "static", null);
ViewsController = __decorate([
    common_1.Controller('/'),
    __metadata("design:paramtypes", [views_service_1.ViewsService])
], ViewsController);
exports.ViewsController = ViewsController;
//# sourceMappingURL=views.controller.js.map