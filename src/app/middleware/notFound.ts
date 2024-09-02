import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: "API not found",
  });
};

export default notFound;
