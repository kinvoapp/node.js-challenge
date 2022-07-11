import { Router } from 'express';
import { despesasController } from "../controllers/despesas";

const despesasRouter = Router();
despesasRouter.get('/', despesasController.listDespesas);
despesasRouter.get('/:id', despesasController.getDespesas);
despesasRouter.post('/', despesasController.insertDespesas);
despesasRouter.put('/:id', despesasController.updateDespesas);
despesasRouter.delete('/:id', despesasController.deleteDespesas);

export {
    despesasRouter,
};