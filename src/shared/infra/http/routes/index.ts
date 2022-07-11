import Router from "express";

import { statementsRoutes } from "./statements.routes";

const router = Router();

router.use("/statements", statementsRoutes);

export { router };
