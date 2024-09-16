import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configs } from "../config";
import { User } from "../modules/user/user.model";

export const auth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    // split token from bearer token
    const token = authorization?.split(" ")[1];

    if (!authorization) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User is not authorized");
    }

    if (!authorization.startsWith("Bearer")) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Invalid authorization format"
      );
    }

    // verify token
    const decoded = jwt.verify(
      token as string,
      configs.jwt_access_secret as string
    ) as JwtPayload;
    const user = await User.isValidUser(decoded.email);
    // check if user is valid or not
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "No User found with this email");
    }

    // check if user is admin or not
    if (user.role !== "admin") {
      throw new AppError(httpStatus.UNAUTHORIZED, "Not authorized!");
    }

    next();
  }
);
