import { Router } from "express";

import { getAllData } from "../controller/manager.controller.js";

const router = Router()

router.route("/alldata").get(getAllData)

export default router
