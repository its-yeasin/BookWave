import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = Router();
const router2 = Router();

// --Create Booking
router.post(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking
);

// --Get All Booking
router.get("/", auth(USER_ROLE.admin), BookingControllers.getAllBooking);

// --Update Booking
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(BookingValidations.updateBookingValidationSchema),
  BookingControllers.updateBooking
);

// --Delete Booking
router.delete("/:id", auth(USER_ROLE.admin), BookingControllers.deleteBooking);

// --Get User's Own bookings
router2.get("/", auth(USER_ROLE.user), BookingControllers.getOwnBookings);

export const BookingRoutes = router;
export const OwnBookingRoutes = router2;
