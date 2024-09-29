import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { SlotControllers } from "./slot.controller";
import { SlotValidations } from "./slot.validation";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = Router();

// --Create Slot
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot
);

// --Get All Slot
router.get("/availability", SlotControllers.getAllSlot);

// --Get Single Slot By ID
router.get("/:id", SlotControllers.getSingleSlot);

export const SlotRoutes = router;
