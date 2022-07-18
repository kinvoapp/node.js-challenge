import { Router } from "express";
import SessionController from "./controllers/SessionController";
import TransactionController from "./controllers/TransactionController";

const routes = new Router();

routes.post("/sessions/create", SessionController.store);
routes.get("/sessions/users", SessionController.index);
routes.post("/transactions/create", TransactionController.store);
routes.get("/transactions/mytransactions", TransactionController.show);
routes.put(
  "/transactions/update/:id_transaction",
  TransactionController.update
);
routes.delete("/transactions/delete", TransactionController.destroy);
routes.get("/balance", TransactionController.balance);

export default routes;
