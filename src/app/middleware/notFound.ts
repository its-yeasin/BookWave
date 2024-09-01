import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../utils/sendResponse";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  return sendResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: "API not found",
    data: null,
  });
};

export default notFound;
