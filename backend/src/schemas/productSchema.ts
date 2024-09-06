import Joi from "joi";

export const productsSchemaJoi = Joi.object({
  Pname: Joi.string().required().min(3).max(20),
  Pprice: Joi.number().required().min(0).positive(),
  Pcategory: Joi.string().required(),
  Pstock: Joi.number().required().min(0).integer().positive(),
});
