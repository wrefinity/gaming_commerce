"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const Joi = require("@hapi/joi");
// category update validations
const userValidation = (values) => {
    const schema = Joi.object({
        username: Joi.string(),
        password: Joi.string().required(),
        email: Joi.string().required()
    });
    return schema.validate(values);
};
exports.userValidation = userValidation;
//# sourceMappingURL=regValidations.js.map