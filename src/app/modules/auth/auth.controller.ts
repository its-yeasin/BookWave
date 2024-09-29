import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { AuthServices } from "./auth.service";
import { excludePasswordField } from "../user/user.utils";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  const { token, user } = result;
  const userData = excludePasswordField(user);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: token,
    data: userData,
  });
});

export const AuthControllers = {
  loginUser,
};
