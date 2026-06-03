import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import {
  createImmunisation,
  getImmunisationsByChild,
  deleteImmunisation,
  updateImmunisation,
} from "./immunisations.controller";

const router = Router();

router.post("/immunisations", verifyToken, createImmunisation);
router.get("/children/:childId/immunisations", verifyToken, getImmunisationsByChild);
router.delete("/immunisations/:immunisationId", verifyToken, deleteImmunisation);
router.patch("/immunisations/:immunisationId", verifyToken, updateImmunisation);

export default router;