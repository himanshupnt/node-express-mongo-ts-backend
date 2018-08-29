import { NextFunction, Request, Response } from "express";

const homeCtrl = (req: Request, res: Response, next: NextFunction): void => {
  res.send({ hello: "world" });
  next();
};

export { homeCtrl };
