import { Router } from "express";

import { addDiamond, deleteDiamond } from "../controller/diamond.controller.js";

const router = Router()

router.route("/addDiamond").post(addDiamond)
router.route("/deleteDiamond").post(deleteDiamond)

export default router