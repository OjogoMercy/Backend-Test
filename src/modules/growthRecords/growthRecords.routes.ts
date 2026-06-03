import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import growthRecordsController from "./growthRecords.controller";
const router = Router();

router.post("/growth-records", verifyToken, growthRecordsController.createGrowthRecord);
router.patch("/growth-records/:growthRecordId", verifyToken, growthRecordsController.updateGrowthRecord);
router.delete("/growth-records/:growthRecordId", verifyToken, growthRecordsController.deleteGrowthRecord);

export default router;