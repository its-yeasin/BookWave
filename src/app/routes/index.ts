import { Router } from "express";
import { RoomRoutes } from "../modules/room/room.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = Router();

const appRoutes = [
  {
    route: RoomRoutes,
    path: "/rooms",
  },
  {
    route: SlotRoutes,
    path: "/slots",
  },
  {
    route: AuthRoutes,
    path: "/auth",
  },
  {
    route: BookingRoutes,
    path: "/bookings",
  },
];

appRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
