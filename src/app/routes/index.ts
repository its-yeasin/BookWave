import { Router } from "express";
import { RoomRoutes } from "../modules/room/room.route";

const router = Router();

const appRoutes = [
  {
    route: RoomRoutes,
    path: "/rooms",
  },
];

appRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
