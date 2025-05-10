import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser,
    getCurrentUser,
    deleteUser
} from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/getCurrentUser").post(getCurrentUser)
router.route("/deleteUser").post(deleteUser)


export default router