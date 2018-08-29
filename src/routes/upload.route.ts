import { Router } from "express";

import { uploadCtrl } from "../controllers";

const router: Router = Router();

router.post("/", uploadCtrl);

export const uploadRoute: Router = router;
