import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import growthRecordsController from "./growthRecords.controller";
const router = Router();

router.post(
  "/growth-records",
  verifyToken,
  growthRecordsController.createNewRecord,
);
router.patch(
  "/growth-records/:growthRecordId",
  verifyToken,
  growthRecordsController.updateRecord,
);
router.delete(
  "/growth-records/:growthRecordId",
  verifyToken,
  growthRecordsController.deleteRecord,
);

export default router;
