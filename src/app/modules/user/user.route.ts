import { Router } from "express";
import { userValidations } from "./user.validation";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

router.post(
  "/create-user",
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
