import express from "express";
import * as authController from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", isAuth, authController.logout);
router.post("/register", validate(registerSchema), authController.register);
router.post("/refresh-token", authController.refreshToken);

export default router;
