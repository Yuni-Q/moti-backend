"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploaderLiveName = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
exports.ImageUploaderLiveName = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const form = new formidable_1.default.IncomingForm();
    console.log(request.body);
    const file = await new Promise(function (resolve, reject) {
        form.parse(request, async (err, fields, files) => {
            try {
                request.body = fields;
                const { file } = files;
                if (!file) {
                    return resolve(null);
                }
                await aws_sdk_1.default.config.update({
                    accessKeyId: process.env.AWSAccessKeyId,
                    secretAccessKey: process.env.AWSSecretKey,
                });
                const s3 = new aws_sdk_1.default.S3();
                const key = file.name;
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
                fs_1.default.unlinkSync(file.path);
                const baseUrl = 'https://cdn.moti.company/';
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
//# sourceMappingURL=image.uploade.live.name.decorator.js.map