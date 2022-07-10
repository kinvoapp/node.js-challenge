import { Router } from "express"
import { balanceRoutes } from "./balance.routes"
import { transactionRoute } from "./transaction.routes"

const routes = Router()

routes.use(transactionRoute)
routes.use(balanceRoutes)

export { routes }
