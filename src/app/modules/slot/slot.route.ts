import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { SlotControllers } from "./slot.controller";
import { SlotValidations } from "./slot.validation";

const router = Router();

// --Create Slot
router.post(
  "/",
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot
);

// --Get All Slot
router.get("/", SlotControllers.getAllSlot);

// --Get Single Slot By ID
router.get("/:id", SlotControllers.getSingleSlot);

// --Update Slot
router.put(
  "/:id",
  validateRequest(SlotValidations.updateSlotValidationSchema),
  SlotControllers.updateSlot
);

export const SlotRoutes = router;
