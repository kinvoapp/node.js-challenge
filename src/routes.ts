import { Router, Response } from "express";

const router = Router();

router.get("/", (_, response: Response) => {
  return response.json({
    ok: true,
  });
});

export { router };
