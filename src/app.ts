require("dotenv").config();

import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import routes from "./routes";

const app = express();

mongoose.connect(
  process.env.DATABASE || "",
  { useNewUrlParser: true },
);
mongoose.Promise = global.Promise;
mongoose.connection
  .on("connected", () => {
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
  .on("error", (err: Error) => {
    console.log(`Connection error: ${err.message}`);
  });

app.use(cors());
app.use("/", routes);

export default app;
