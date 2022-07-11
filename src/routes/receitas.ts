import { Router } from 'express';
import { receitasController } from "../controllers/receitas";

const receitasRouter = Router();
receitasRouter.get('/', receitasController.listReceitas);
receitasRouter.get('/:id', receitasController.getReceitas);
receitasRouter.post('/', receitasController.insertReceitas);
receitasRouter.put('/:id', receitasController.updateReceitas);
receitasRouter.delete('/:id', receitasController.deleteReceitas);
export {
    receitasRouter,
};