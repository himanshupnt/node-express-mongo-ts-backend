import { NextFunction, Request, Response } from "express";

import { ISatellite, Satellite } from "../models/satellite";

const satelliteCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const items: ISatellite[] = await Satellite.find({});
    res.send(items);
  } catch (error) {
    next(error);
  }
};

export { satelliteCtrl };
