import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import { createGrowthRecord, updateGrowthRecord, deleteGrowthRecord } from "./growthRecords.controller";

const router = Router();

router.post("/growth-records", verifyToken, createGrowthRecord);
router.patch("/growth-records/:growthRecordId", verifyToken, updateGrowthRecord);
router.delete("/growth-records/:growthRecordId", verifyToken, deleteGrowthRecord);

export default router;