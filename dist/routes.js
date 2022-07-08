"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
route.get("/", (_req, res) => {
    res.status(200).json({ app: "Cada centavo" });
});
exports.default = route;
