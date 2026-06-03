import { Response, NextFunction,Request } from "express";
import childService from "./Children.services";

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

 const createChild = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, dateOfBirth, gender } = req.body;
    if (!name || !dateOfBirth || !gender) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    
    const parsedDOB = new Date(dateOfBirth);
    if (isNaN(parsedDOB.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const newChild = await childService.createChild(
      name,
      parsedDOB,
      gender,
      req.user.userId,
    );
    
    return res.status(201).json({ 
      message: "Child created successfully", 
      child: newChild 
    });
  } catch (error) {
    next(error);
  }
};

 const getChildren = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const children = await childService.getChildrenByUserId(req.user.userId);
    
    if (!children || children.length === 0) {
     return res.status(200).json({ message: "Children retrieved successfully", children });
    }
    
    return res.status(200).json({ 
      message: "Children retrieved successfully", 
      children 
    });
  } catch (error) {
    next(error);
  }
};

 const getGrowthRecords = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { childId } = req.params;
    const growthRecords = await childService.getGrowthRecords(childId, req.user.userId);
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