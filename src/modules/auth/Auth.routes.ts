import express, { Router } from "express";
import authController from "./Auth.controller";
import { verifyToken } from "../../middleware/auth";

const router: Router = express.Router();

router.post("/register", authController.register as any);
router.post("/login", authController.login as any);
router.get("/profile", verifyToken as any, authController.profile as any);

const authRoutes = router;
export default authRoutes;