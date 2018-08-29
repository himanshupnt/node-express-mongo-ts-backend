import { Router } from "express";

import { homeCtrl } from "../controllers";

const router: Router = Router();

router.get("/", homeCtrl);

export const homeRoute: Router = router;
