import { Response, NextFunction, Request } from "express";
import type { AuthenticatedRequest } from "../../types/express";
import growthRecordService from "./growthRecords.services";

const createNewRecord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { height, weight, childId, date } = req.body;
    const missingFields: string[] = [];

    if (!height) missingFields.push("height");
    if (!weight) missingFields.push("weight");
    if (!childId) missingFields.push("childId");

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: `Please fill in: ${missingFields.join(", ")}` });
    }

    if (date && isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const record = await growthRecordService.createGrowthRecord(
      parseFloat(height),
      parseFloat(weight),
      childId,
      userId,
      date ? new Date(date) : undefined,
    );

    return res.status(201).json({
      message: "Growth record created successfully",
      growthRecord: record,
    });
  } catch (error) {
    next(error);
  }
};

const updateRecord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { growthRecordId } = req.params;
    const { height, weight, date } = req.body;

    if (!height && !weight && !date) {
      return res
        .status(400)
        .json({ message: "Please provide at least one field to update" });
    }

    if (date && isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const updated = await growthRecordService.updateGrowthRecord(
      growthRecordId as string,
      userId,
      height ? parseFloat(height) : undefined,
      weight ? parseFloat(weight) : undefined,
      date ? new Date(date) : undefined,
    );

    return res
      .status(200)
      .json({ message: "Record updated successfully", growthRecord: updated });
  } catch (error) {
    next(error);
  }
};

const deleteRecord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { growthRecordId } = req.params;
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    await growthRecordService.deleteGrowthRecord(
      growthRecordId as string,
      userId,
    );
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
const getGrowthRecordController = {
  createNewRecord,
  updateRecord,
  deleteRecord,
};
export default getGrowthRecordController;
