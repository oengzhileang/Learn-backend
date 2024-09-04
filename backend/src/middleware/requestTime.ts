import { Request, Response, NextFunction } from "express";

export function requestTime(req: Request, res: Response, next: NextFunction) {
  console.log(`Request Time: ${new Date().toLocaleString()}`);
  next(); //pass request to another route 
}
