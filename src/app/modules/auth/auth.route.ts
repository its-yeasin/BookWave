import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserControllers } from "../user/user.controller";
import { userValidations } from "../user/user.validation";

const router = Router();

router.post(
  "/sign-up",
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createUser
);

export const AuthRoutes = router;
