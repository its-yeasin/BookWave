/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Error occurred";

  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    stack: err,
  });
};

export default globalErrorHandler;
