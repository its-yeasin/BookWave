import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const appRoutes = [
  {
    route: UserRoutes,
    path: "/users",
  },
];

appRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
