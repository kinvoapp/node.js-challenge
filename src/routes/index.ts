
import { Application, Router } from "express";
import { receitasRouter } from "./receitas";
import { despesasRouter } from "./despesas";
import { saldoRouter } from "./saldo";



export const useRoutes = (app: Application) => {
    const apiRouter = Router();

    apiRouter.use('/receitas', receitasRouter);
    apiRouter.use('/despesas', despesasRouter);
    apiRouter.use('/saldo', saldoRouter);

    app.use('/api/v1', apiRouter);
}