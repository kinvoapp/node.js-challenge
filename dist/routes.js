"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { deleteUser, getUsers, getUser, updateUser, userCreate, } = require("./controllers/user.controller");
const { login } = require("./controllers/login.controller");
const { revenueCreate, revenueGetAll, revenueGetById, revenueSearchForDates, } = require("./controllers/revenue.controller");
// const { validationToken } = require("./middlewares/auth");
const route = (0, express_1.Router)();
route.get("/", (_req, res) => res.status(200).json({ app: "Cada centavo" }));
// User CRUD
route.post("/user", userCreate);
route.get("/user", getUsers);
route.get("/user/:id", getUser);
route.put("/user/:id", updateUser);
route.delete("/user/:id", deleteUser);
// Login
route.post("/login", login);
// Revenues and Expenses
route.post("/revenue", revenueCreate);
route.get("/revenue", revenueGetAll);
route.get("/revenue/:id", revenueGetById);
route.post("/search-revenues", revenueSearchForDates);
module.exports = route;
