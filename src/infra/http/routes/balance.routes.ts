import { Router } from "express"
import { getBalanceController } from "../../main"

const balanceRoutes = Router()

balanceRoutes.get("/balance", async (req, res) => await getBalanceController.handle(req, res))

export { balanceRoutes }
