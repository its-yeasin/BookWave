import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { RoomControllers } from "./room.controller";
import { RoomValidations } from "./room.validation";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = Router();

// --Create Room
router.post(
  "/",
  auth(USER_ROLE.admin),
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
  auth(USER_ROLE.admin),
  validateRequest(RoomValidations.updateRoomValidationSchema),
  RoomControllers.updateRoom
);

// --Delete Room
router.delete("/:id", auth(USER_ROLE.admin), RoomControllers.deleteRoom);

export const RoomRoutes = router;
