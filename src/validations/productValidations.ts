const Joi = require("@hapi/joi");

export const ProductValidation = (data: object) => {

  const productSchema = Joi.object({
    name: Joi.string().required(),
    desc: Joi.string().required(),
    // status: Joi.boolean().default(true),
    brand: Joi.string().required(),
    catId: Joi.string().required(),
    price: Joi.number().required(),
    // state: Joi.string().valid("active", "suspended", "out of stock").required(),
    quantity: Joi.number().default(0),
    images: Joi.string().required(),
    // images: Joi.array().items(Joi.string())
  });

  return productSchema.validate(data);
};


