import express from "express";
import * as userController from "../controllers/userController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/profile", isAuth, userController.profile);

export default router;