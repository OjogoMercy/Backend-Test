import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "NO token provided" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as any);
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};
