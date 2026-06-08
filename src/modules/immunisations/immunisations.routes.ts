import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import immunisationController from "./immunisations.controller";

const router = Router();

router.post(
  "/immunisations",
  verifyToken,
  immunisationController.createImmunisation,
);
router.get(
  "/children/:childId/immunisations",
  verifyToken,
  immunisationController.getImmunisationsByChild,
);
router.delete(
  "/immunisations/:immunisationId",
  verifyToken,
  immunisationController.handleDeleteImmunisation,
);
router.patch(
  "/immunisations/:immunisationId",
  verifyToken,
  immunisationController.handleUpdateImmunisation,
);

export default router;
