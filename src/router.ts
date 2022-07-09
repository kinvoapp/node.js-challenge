// Imports
import { Router } from "express";

// Imports de controllers
import IncomeController from "./controllers/IncomeController";
import SpendController from "./controllers/SpendController";
import BalanceController from "./controllers/BalanceController";

// Inicia o router
const router = Router();

// Endpoints de receitas
router.post("/api/v1/income", IncomeController.create);
router.get("/api/v1/income", IncomeController.read);
router.put("/api/v1/income", IncomeController.update);
router.delete("/api/v1/income", IncomeController.delete);

// Endpoints de despesas
router.post("/api/v1/spend", SpendController.create);
router.get("/api/v1/spend", SpendController.read);
router.put("/api/v1/spend", SpendController.update);
router.delete("/api/v1/spend", SpendController.delete);

// Endpoint para mostrar o saldo
router.get("/api/v1/balance", BalanceController.read);

export default router;
