import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    userId?: string;
  };
}

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
