import { Router, Request, Response } from "express";
const {
  deleteUser,
  getUsers,
  getUser,
  updateUser,
  userCreate,
} = require("./controllers/user.controller");

const route = Router();
route.get("/", (_req: Request, res: Response) =>
  res.status(200).json({ app: "Cada centavo" })
);

route.post("/user", userCreate);

route.get("/user", getUsers);

route.get("/user/:id", getUser);

route.put("/user/:id", updateUser);

route.delete("/user/:id", deleteUser);

module.exports = route;
