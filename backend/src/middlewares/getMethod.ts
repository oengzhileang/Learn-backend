import { Request, Response, NextFunction } from "express";
export function getRequestMethod(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(`${req.path} ${req.method}`);
    next();
  }