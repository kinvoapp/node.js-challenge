import { Router, Response } from "express";
import { AuthenticateStudentController } from "./controllers/Student/AuthenticateStudentController";
import { CreateStudentController } from "./controllers/Student/CreateStudentController";
import { CreateTransactionController } from "./controllers/Transaction/CreateTransactionController";
import { GetAccountBalanceController } from "./controllers/Transaction/GetAccountBalanceController";
import { GetTransactionsController } from "./controllers/Transaction/GetTransactionsController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createStudentController = new CreateStudentController();
const authenticateStudentController = new AuthenticateStudentController();
const createTransactionController = new CreateTransactionController();
const getAccountBalanceController = new GetAccountBalanceController();
const getTransactionsController = new GetTransactionsController();

router.get("/", (_, response: Response) => {
  return response.json({
    ok: true,
  });
});

router.post("/student", createStudentController.handle);
router.post("/login/student", authenticateStudentController.handle);
router.post(
  "/transaction",
  ensureAuthenticated,
  createTransactionController.handle
);
router.get("/balance", ensureAuthenticated, getAccountBalanceController.handle);
router.get(
  "/transaction",
  ensureAuthenticated,
  getTransactionsController.handle
);

export { router };
