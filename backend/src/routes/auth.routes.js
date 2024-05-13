import { Router } from "express";
import { login,refreshAccessToken,logout,register, getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middleware/user.middleware.js";

const router = Router();

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/logout").post(verifyJwt, logout)

router.route("/refresh-access-token").post(refreshAccessToken)

router.route("/get-current-user").post(verifyJwt,getCurrentUser)

router.route("/refresh-access-token").post(refreshAccessToken)


export default router