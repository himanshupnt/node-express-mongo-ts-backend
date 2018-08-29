import mongoose from "mongoose";

const model = mongoose.model;

interface IBarrel {
  _errors: string[];
  batch_id: number;
  last_flavor_sensor_result: string;
  status: string;
}

interface ISatellite {
  current_telemetry_timestamp: number;
  prev_telemetry_timestamp: number;
  satellite_id: number;
  barrels: IBarrel[];
}

interface ISatelliteModel extends ISatellite, mongoose.Document {}

const SatelliteSchema: mongoose.Schema = new mongoose.Schema({
  barrels: [
    {
      _errors: [String],
      batch_id: Number,
      last_flavor_sensor_result: String,
      status: String,
    },
  ],
  current_telemetry_timestamp: Number,
  prev_telemetry_timestamp: Number,
  satellite_id: Number,
});

const Satellite: mongoose.Model<ISatelliteModel> = mongoose.model<
  ISatelliteModel
>("Satellite", SatelliteSchema);

export { Satellite, ISatellite, IBarrel };
