const Joi = require("@hapi/joi");


// category update validations
export const userValidation = (values: object) => {
  const schema = Joi.object({
      username: Joi.string(),
      password: Joi.string().required(),
      email: Joi.string().required()
  });
  return schema.validate(values);
}