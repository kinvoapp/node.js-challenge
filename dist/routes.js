"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./controllers/user.controller");
const route = (0, express_1.Router)();
route.get("/", (_req, res) => {
    res.status(200).json({ app: "Cada centavo" });
});
route.post("/user", user_controller_1.userCreate);
route.get("/user", user_controller_1.getUsers);
route.put("/user/:id", user_controller_1.updateUser);
route.delete("/user/:id", user_controller_1.deleteUser);
exports.default = route;
