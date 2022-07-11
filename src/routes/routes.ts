import { BalanceController } from './../controllers/BalanceController';
import { Router } from "express";
import { ExpenseController } from './../controllers/ExpenseController';
import { EarningController } from "../controllers/EarningController";


const routes = Router();

routes.get('/', (req, res) => res.send('aplicação funcionando'));

routes.post('/earning', new EarningController().create);
routes.get('/earning', new EarningController().index);
routes.put('/earning/:id/', new EarningController().updateEarning);
routes.delete('/earning/:id/', new EarningController().deleteEarning);


routes.post('/expense', new ExpenseController().create);
routes.get('/expense', new ExpenseController().index);
routes.put('/expense/:id/', new ExpenseController().updateExpense);
routes.delete('/expense/:id/', new ExpenseController().deleteExpense);


routes.get('/balance', new BalanceController().index);



export default routes;