import {Router} from 'express'
import {financeController} from '../controller/finance'
const Routes = Router()

Routes.post('/finance',  new financeController().addTransaction)
Routes.patch('/finance/:id', new financeController().updateTransaction)
Routes.delete('/finance/:id', new financeController().deleteTransaction)
Routes.get('/finance', new financeController().loadTransaction)
Routes.get('/balance', new financeController().loadBalance)

export default Routes