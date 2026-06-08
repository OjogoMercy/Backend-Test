import { Response, NextFunction, Request } from "express";
import childService from "./Children.services";

import { AuthenticatedRequest } from "../../types/express";

const createChild = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, dateOfBirth, gender } = req.body;
    const authReq = req as AuthenticatedRequest;
    if (!name || !dateOfBirth || !gender) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const parsedDOB = new Date(dateOfBirth);
    if (isNaN(parsedDOB.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const userId = authReq.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const newChild = await childService.createChild(
      name,
      parsedDOB,
      gender,
      userId,
    );

    return res.status(201).json({
      message: "Child created successfully",
      child: newChild,
    });
  } catch (error) {
    next(error);
  }
};

const getChildren = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const children = await childService.getChildrenByUserId(userId);

    if (!children || children.length === 0) {
      return res
        .status(200)
        .json({ message: "Children retrieved successfully", children });
    }

    return res.status(200).json({
      message: "Children retrieved successfully",
      children,
    });
  } catch (error) {
    next(error);
  }
};

const getGrowthRecords = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthenticatedRequest;
  try {
    const { childId } = req.params;
    if (!childId)
      return res.status(400).json({ message: "Child ID is required" });

    const userId = authReq.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const growthRecords = await childService.getGrowthRecords(childId, userId);
    return res.status(200).json({
      message: "Growth records retrieved successfully",
      records: growthRecords,
    });
  } catch (error) {
    next(error);
  }
};
const childrenController = { createChild, getChildren, getGrowthRecords };
export default childrenController;
