import { Router } from "express";
import { transactionsRoutes } from "../../modules/transactions/routes/transactions.routes";
import { usersRoutes } from "../../modules/users/routes/users.routes";




const routes = Router();

routes.use('/users', usersRoutes)
routes.use('/transactions', transactionsRoutes)

export {routes}