import { Router } from "express";

import { workerController, getWorkerData } from "../controller/worker.controller.js";

const router = Router()

router.route("/status").post(workerController)
router.route("/getworkerdata").post(getWorkerData)


export default router