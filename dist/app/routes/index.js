"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tesRoute_1 = require("../utils/tesRoute");
const router = (0, express_1.Router)();
const appRoutes = [
    {
        route: tesRoute_1.TestRoutes,
        path: "/test",
    },
];
appRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
