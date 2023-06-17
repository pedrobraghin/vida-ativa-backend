import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/BaseError";

export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(error.message);
  if (error instanceof BaseError) {
    return res.status(error.status).json({
      status: "fail",
      message: error.message,
    });
  }
  return res.status(500).json({ error: "Internal Server Error" });
}
