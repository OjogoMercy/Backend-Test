import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../types/express";
import * as immunisationService from "./immunisations.services";

export const createImmunisation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { vaccineId, administeredDate, childId } = req.body;

    if (!vaccineId || !administeredDate || !childId) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (isNaN(new Date(administeredDate).getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const immunisation = await immunisationService.createImmunisation(
      vaccineId,
      new Date(administeredDate),
      childId,
      req.user.userId
    );

    return res.status(201).json({
      message: "Immunisation created successfully",
      immunisation,
    });
  } catch (error) {
    next(error);
  }
};

export const getImmunisationsByChild = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { childId } = req.params;
    const immunisations = await immunisationService.getImmunisationsByChild(
      childId,
      req.user.userId
    );
    return res.status(200).json({ message: "List of immunisations", immunisations });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteImmunisation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { immunisationId } = req.params;
    await immunisationService.deleteImmunisation(immunisationId, req.user.userId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const handleUpdateImmunisation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { immunisationId } = req.params;
    const { administered } = req.body;

    if (administered === undefined) {
      return res.status(400).json({ message: "Please provide the administered field" });
    }

    const updated = await immunisationService.updateImmunisation(
      immunisationId,
      req.user.userId,
      administered
    );

    if (!updated) {
      return res.status(404).json({ message: "Immunisation record not found or access denied" });
    }

    return res.status(200).json({
      message: "Immunisation updated successfully",
      immunisation: updated,
    });
  } catch (error) {
    next(error);
  }
};