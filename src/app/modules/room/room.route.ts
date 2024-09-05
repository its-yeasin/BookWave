import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { RoomControllers } from "./room.controller";
import { RoomValidations } from "./room.validation";

const router = Router();

// --Create Room
router.post(
  "/",
  validateRequest(RoomValidations.createRoomValidationSchema),
  RoomControllers.createRoom
);

// --Get All Room
router.get("/", RoomControllers.getAllRoom);

// --Get Single Room By ID
router.get("/:id", RoomControllers.getSingleRoom);

// --Update Room
router.put(
  "/:id",
  validateRequest(RoomValidations.updateRoomValidationSchema),
  RoomControllers.updateRoom
);

// --Delete Room
router.delete("/:id", RoomControllers.deleteRoom);

export const RoomRoutes = router;
