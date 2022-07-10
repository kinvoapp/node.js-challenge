import "express-async-errors"

import express, { json } from "express"
import { errorMiddleware } from "./http/middlewares/errorMiddleware"
import { routes } from "./http/routes"

const app = express()
app.use(json())

app.use(routes)

app.use(errorMiddleware)

export { app }
