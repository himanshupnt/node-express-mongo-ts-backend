import { Router } from "express";
import { homeRoute } from "./home.route";
import { satelliteRoute } from "./satellite.route";
import { uploadRoute } from "./upload.route";

const router: Router = Router();

router.use("/", homeRoute);
router.use("/upload", uploadRoute);
router.use("/satellites", satelliteRoute);

export default router;
