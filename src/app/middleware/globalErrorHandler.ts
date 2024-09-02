/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../utils/sendResponse";
import { TErrorSource } from "../interface/error";
import { configs } from "../config";
import { ZodError } from "zod";
import handleZodError from "../error/handlerZodError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = err.message || "Error occurred";
  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Error occurred",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  return sendResponse(res, {
    statusCode,
    success: false,
    message,
    errorSources,
    stack: configs.isDev ? err.stack : null,
  });
};

export default globalErrorHandler;
