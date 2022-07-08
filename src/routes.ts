import { Router, Request, Response } from "express";
import { getUsers, userCreate } from "./controllers/user.controller";

const route = Router();

route.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ app: "Cada centavo" });
});

route.post("/user", userCreate);

route.get("/user", getUsers);

export default route;
