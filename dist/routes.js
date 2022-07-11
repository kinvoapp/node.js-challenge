"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { deleteUser, getUsers, getUser, updateUser, userCreate, } = require("./controllers/user.controller");
const { login } = require("./controllers/login.controller");
const { revenueCreate, revenueGetAll, revenueGetById, revenueSearchForDates, revenueUpdate, revenueDelete, } = require("./controllers/revenue.controller");
const { expenseCreate, expenseGetAll, expenseGetById, expenseSearchForDates, expenseUpdate, expenseDelete, } = require("./controllers/expense.controller");
const { getBalance } = require("./controllers/balance.controller");
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
// Revenues
route.post("/revenue", revenueCreate);
route.get("/revenue", revenueGetAll);
route.get("/revenue/:id", revenueGetById);
route.post("/search-revenues", revenueSearchForDates);
route.put("/revenue/:id", revenueUpdate);
route.delete("/revenue/:id", revenueDelete);
// Expenses
route.post("/expense", expenseCreate);
route.get("/expense", expenseGetAll);
route.get("/expense/:id", expenseGetById);
route.post("/search-expenses", expenseSearchForDates);
route.put("/expense/:id", expenseUpdate);
route.delete("/expense/:id", expenseDelete);
// Balance
route.get("/balance", getBalance);
module.exports = route;
