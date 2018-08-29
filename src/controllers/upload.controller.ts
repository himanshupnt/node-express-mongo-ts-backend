import Busboy from "busboy";
import { NextFunction, Request, Response } from "express";

import { IBarrel, ISatellite, Satellite } from "../models/satellite";

interface IModBarrels {
  [k: string]: IBarrel;
}

const uploadCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bb = new Busboy({ headers: req.headers });
    let satelliteData = "";
    bb.on("file", (_, file, fileName) => {
      // const saveTo = path.join(uploadPath, path.basename(fileName));
      file.on("data", (data: Buffer) => {
        satelliteData += data;
      });
      file.on("end", () => {
        return;
      });
    });

    bb.on("finish", async () => {
      const parsed = JSON.parse(satelliteData);

      const satelliteUpdate: ISatellite = {
        ...parsed,
        barrels: parsed.barrels.map((b: any) => {
          b._errors = b.errors;
          return b;
        }),
        current_telemetry_timestamp: parsed.telemetry_timestamp,
        prev_telemetry_timestamp: parsed.telemetry_timestamp,
      };

      const updatedSatellite: ISatellite = await updateSatellite(
        satelliteUpdate,
      );

      res.writeHead(200, { Connection: "close" });
      res.end(JSON.stringify({ message: "success", item: updatedSatellite }));
    });
    return req.pipe(bb);
  } catch (error) {
    next(error);
  }
};

const updateSatellite = async (satellite: ISatellite) => {
  let updatingBarrels: IBarrel[] = [];

  try {
    const item = await Satellite.findOne({
      satellite_id: satellite.satellite_id,
    });

    if (!item) {
      const newSatellite = await Satellite.create(satellite);
      return newSatellite;
    } else if (item) {
      updatingBarrels = getUpdatingBarrels(item.barrels, satellite.barrels);
      const updatedItem = await Satellite.updateOne(
        { satellite_id: satellite.satellite_id },
        {
          $set: {
            barrels: updatingBarrels,
            current_telemetry_timestamp: satellite.current_telemetry_timestamp,
            prev_telemetry_timestamp: item.current_telemetry_timestamp,
          },
        },
      );
      return updatedItem;
    }
  } catch (error) {
    throw Error(error.message);
  }
};

const getUpdatingBarrels = (
  savedBarrels: IBarrel[],
  updateBarrels: IBarrel[],
) => {
  const modifiedUpdateBarrels = arrayToObj(updateBarrels);
  const modifiedSavedBarrels = arrayToObj(savedBarrels);
  // console.log(
  //   ">>>>>>>>>>>>>>>>>>>>>>",
  //   modifiedSavedBarrels,
  //   "----------------###",
  //   modifiedUpdateBarrels,
  // );
  const updatingBarrels: IBarrel[] = savedBarrels.map((barrel: IBarrel) => {
    if (barrel.batch_id in Object.keys(modifiedUpdateBarrels)) {
      const currentBarrel: IBarrel = modifiedUpdateBarrels[barrel.batch_id];
      barrel.last_flavor_sensor_result =
        currentBarrel.last_flavor_sensor_result;
      barrel.status = currentBarrel.status;
    }
    return barrel;
  });

  // include new barrels, if any

  updateBarrels.forEach((barrel: IBarrel) => {
    if (
      Object.keys(modifiedSavedBarrels).includes(`${barrel.batch_id}`) === false
    ) {
      updatingBarrels.push(barrel);
    }
  });

  return updatingBarrels;
};

const arrayToObj = (barrels: IBarrel[]): IModBarrels => {
  const modBarrels: IModBarrels = {};
  barrels.forEach((barrel: IBarrel) => {
    modBarrels[barrel.batch_id] = barrel;
  });
  return modBarrels;
};

export { uploadCtrl };
