import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = Router();

// --Create Booking
router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking
);

// --Get All Booking
router.get("/", auth(USER_ROLE.admin), BookingControllers.getAllBooking);

// --Get User's Own bookings
router.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  BookingControllers.getOwnBookings
);

// --Update Booking
router.put("/:id", auth(USER_ROLE.admin), BookingControllers.updateBooking);

// --Delete Booking
router.delete("/:id", auth(USER_ROLE.admin), BookingControllers.deleteBooking);

export const BookingRoutes = router;
