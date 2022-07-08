import { Router, Request, Response } from "express";
import {
  getUsers,
  updateUser,
  userCreate,
} from "./controllers/user.controller";

const route = Router();

route.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ app: "Cada centavo" });
});

route.post("/user", userCreate);

route.get("/user", getUsers);

route.put("/user/:id", updateUser);

export default route;
