import Joi from "joi";

const categorySchema  = Joi.object({
  name: Joi.string().required().min(6),
  products: Joi.array(),
});
export default categorySchema