import express from "express";
import "express-async-errors";
import { errorHandler } from "./middlewares/errorHandler";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(errorHandler);

export default app;
