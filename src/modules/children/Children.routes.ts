import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import { createChild, getChildren, getGrowthRecords } from "./Children.controller";

const router = Router();

router.post("/children", verifyToken, createChild);
router.get("/children", verifyToken, getChildren);
router.get("/children/:childId/growthRecords", verifyToken, getGrowthRecords);

export default router;