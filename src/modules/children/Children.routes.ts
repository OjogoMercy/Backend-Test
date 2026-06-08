import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import childrenController from "./Children.controller";
const router = Router();

router.post("/children", verifyToken, childrenController.createChild);
router.get("/children", verifyToken, childrenController.getChildren);
router.get(
  "/children/:childId/growthRecords",
  verifyToken,
  childrenController.getGrowthRecords,
);

const childrenRoutes = router;
export default childrenRoutes;
