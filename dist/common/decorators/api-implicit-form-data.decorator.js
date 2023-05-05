"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiImplicitFormData = void 0;
const helpers_1 = require("@nestjs/swagger/dist/decorators/helpers");
const initialMetadata = {
    name: '',
    required: true,
};
const ApiImplicitFormData = (metadata) => {
    const param = {
        name: metadata.name === null || metadata.name === undefined ? initialMetadata.name : metadata.name,
        in: 'formData',
        description: metadata.description || '',
        required: metadata.required || false,
        type: metadata.type,
    };
    return helpers_1.createParamDecorator(param, initialMetadata);
};
exports.ApiImplicitFormData = ApiImplicitFormData;
//# sourceMappingURL=api-implicit-form-data.decorator.js.map