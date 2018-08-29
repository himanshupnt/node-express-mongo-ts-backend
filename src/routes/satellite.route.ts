import { Router } from "express";

import { satelliteCtrl } from "../controllers";

const router: Router = Router();

router.get("/", satelliteCtrl);

export const satelliteRoute: Router = router;
