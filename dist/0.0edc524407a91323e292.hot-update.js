exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 61:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VersionMiddleware = void 0;
const common_1 = __webpack_require__(8);
let VersionMiddleware = class VersionMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    use(request, response, next) {
        try {
            if (request.headers.test === 'test') {
                next();
                return;
            }
            console.log(11, request.headers.appVersion);
            if (!!(request.headers.appVersion || request.headers.appversion) &&
                parseInt((request.headers.appVersion || request.headers.appversion), 10) <= 2) {
                response.status(200).json({
                    status: 1200,
                    message: '앱 버전 업데이트가 필요합니다.',
                    data: null,
                });
                return;
            }
        }
        catch (error) {
            console.log(error);
            next();
            return;
        }
        next();
    }
};
VersionMiddleware = __decorate([
    common_1.Injectable()
], VersionMiddleware);
exports.VersionMiddleware = VersionMiddleware;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "9281bf50ac8c018a00b0"
/******/ 	})();
/******/ 	
/******/ }
;