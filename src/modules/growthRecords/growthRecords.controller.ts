import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../types/express";
import * as growthRecordService from "./growthRecords.services";

export const createGrowthRecord = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { height, weight, childId, date } = req.body;
    const missingFields: string[] = [];

    if (!height) missingFields.push("height");
    if (!weight) missingFields.push("weight");
    if (!childId) missingFields.push("childId");

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Please fill in: ${missingFields.join(", ")}` });
    }

    if (date && isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const record = await growthRecordService.createGrowthRecord(
      parseFloat(height),
      parseFloat(weight),
      childId,
      req.user.userId,
      date ? new Date(date) : undefined
    );

    return res.status(201).json({ message: "Growth record created successfully", growthRecord: record });
  } catch (error) {
    next(error);
  }
};

export const updateGrowthRecord = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { growthRecordId } = req.params;
    const { height, weight, date } = req.body;

    if (!height && !weight && !date) {
      return res.status(400).json({ message: "Please provide at least one field to update" });
    }

    if (date && isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const updated = await growthRecordService.updateGrowthRecord(
      growthRecordId,
      req.user.userId,
      height ? parseFloat(height) : undefined,
      weight ? parseFloat(weight) : undefined,
      date ? new Date(date) : undefined
    );

    return res.status(200).json({ message: "Record updated successfully", growthRecord: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteGrowthRecord = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { growthRecordId } = req.params;
    await growthRecordService.deleteGrowthRecord(growthRecordId, req.user.userId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};