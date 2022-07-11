import { Router } from 'express';
import { saldoController } from "../controllers/saldo";

const saldoRouter = Router();
saldoRouter.get('/', saldoController.listSaldo);

export {
    saldoRouter,
};