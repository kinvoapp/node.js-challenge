// import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import router from './routes/router'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use("/api", router);

export default app
