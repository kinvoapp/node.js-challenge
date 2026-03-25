import express from "express";
import cors from "cors";
import transactionsRouter from "./modules/transactions/routes/transactions.js";
import balanceRouter from "./modules/transactions/routes/balance.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/transactions", transactionsRouter);
app.use("/balance", balanceRouter);

// sends the errors to the middleware
app.use(errorHandler);

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
