import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required().min(6),
  price: Joi.number().required(),
  imgs: Joi.array().required(),
  description: Joi.string(),
  categoryId: Joi.string().required(),
});