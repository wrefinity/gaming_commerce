const Joi = require("@hapi/joi");

// category update validations
export const categoryValidation = (values: object) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        desc: Joi.string(),
        createdBy:Joi.string(),
        updatedBy:Joi.string(),
    });
    return schema.validate(values);
}