import { Request, Response, NextFunction } from "express";

import Joi from "joi";

const productsSchemaJoi = Joi.object({
  Pname: Joi.string().required().min(3).max(20),
  Pprice: Joi.number().required().min(0),
  Pcategory: Joi.string().required(),
  Pstock: Joi.number().required().min(0),
});

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = productsSchemaJoi.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
