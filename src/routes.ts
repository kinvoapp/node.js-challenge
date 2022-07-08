import { Router, Request, Response } from "express";

const route = Router();

route.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ app: "Cada centavo" });
});

export default route;
