import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserControllers } from "../user/user.controller";
import { userValidations } from "../user/user.validation";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post(
  "/sign-up",
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
