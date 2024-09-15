import httpStatus from "http-status";
import { ILogin } from "./auth.interface";
import jwt from "jsonwebtoken";

import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { configs } from "../../config";

const loginUser = async (payload: ILogin) => {
  //check use exist or not
  const user = await User.isValidUser(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "No User found with this email");
  }

  //check password validation
  if (!(await User.isPasswordValid(payload.password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password!");
  }

  const accessPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    accessPayload,
    configs.jwt_access_secret as string,
    {
      expiresIn: configs.jwt_access_expires_in as string,
    }
  );

  const result = {
    token: accessToken,
    user,
  };
  return result;
};

export const AuthServices = {
  loginUser,
};
