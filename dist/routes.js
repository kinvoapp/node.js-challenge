"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./controllers/user.controller");
const route = (0, express_1.Router)();
route.get("/", (_req, res) => {
    res.status(200).json({ app: "Cada centavo" });
});
route.post("/user", user_controller_1.userCreate);
exports.default = route;
