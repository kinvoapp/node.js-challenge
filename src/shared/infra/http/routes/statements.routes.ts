import Router from "express";

import { CreateStatementController } from "../../../../modules/statements/useCases/createStatement/CreateStatementController";
import { DeleteStatementController } from "../../../../modules/statements/useCases/deleteStatement/DeleteStatementController";
import { GetBalanceController } from "../../../../modules/statements/useCases/getBalance/GetBalanceController";
import { ListStatementsController } from "../../../../modules/statements/useCases/listStatements/ListStatementsController";
import { UpdateStatementController } from "../../../../modules/statements/useCases/updateStatement/UpdateStatementController";

const statementsRoutes = Router();

const createStatementController = new CreateStatementController();
const listStatementsController = new ListStatementsController();
const getBalanceController = new GetBalanceController();
const updateStatementController = new UpdateStatementController();
const deleteStatementController = new DeleteStatementController();

statementsRoutes.get("/", listStatementsController.handle);
statementsRoutes.get("/balance", getBalanceController.handle);
statementsRoutes.post("/income", createStatementController.handle);
statementsRoutes.post("/expense", createStatementController.handle);
statementsRoutes.put("/:id", updateStatementController.handle);
statementsRoutes.delete("/:id", deleteStatementController.handle);

export { statementsRoutes };
