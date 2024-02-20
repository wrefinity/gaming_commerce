"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const Joi = require("@hapi/joi");
// category update validations
const categoryValidation = (values) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        desc: Joi.string(),
        createdBy: Joi.string(),
        updatedBy: Joi.string(),
    });
    return schema.validate(values);
};
exports.categoryValidation = categoryValidation;
//# sourceMappingURL=categoryValidation.js.map