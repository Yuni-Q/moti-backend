"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploader = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const formidable_1 = __importDefault(require("formidable"));
const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
exports.ImageUploader = common_1.createParamDecorator(async (pathName, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const form = new formidable_1.default.IncomingForm();
    const file = await new Promise(function (resolve, reject) {
        form.parse(request, async (err, fields, files) => {
            try {
                request.body = fields;
                const { file } = files;
                if (!file) {
                    return resolve(null);
                }
                aws_sdk_1.default.config.update({
                    accessKeyId: process.env.AWSAccessKeyId,
                    secretAccessKey: process.env.AWSSecretKey,
                });
                const s3 = new aws_sdk_1.default.S3();
                let fileName = '';
                for (let i = 0; i < 8; i += 1) {
                    fileName += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                const key = `${pathName}/${fileName}${path_1.default.parse(file.name).ext}`;
                if (process.env.NODE_ENV !== 'test') {
                    s3.upload({
                        Bucket: process.env.buket,
                        Key: key,
                        ACL: 'public-read',
                        Body: fs_1.default.createReadStream(file.path),
                    }, (error, result) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                    });
                }
                fs_1.default.unlinkSync(file.path);
                const baseUrl = 'https://storage.moti.company/';
                const imageUrl = baseUrl + key;
                resolve(imageUrl);
            }
            catch (error) {
                console.log(error);
                reject(error);
            }
        });
    });
    return Object.assign(Object.assign({}, request.body), { file });
});
//# sourceMappingURL=image-uploader.decorator.js.map