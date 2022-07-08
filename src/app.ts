import express from 'express'

import HelloRoute from '@routes/hello.routes'

const app = express()

app.use(express.json())

app.use('/', HelloRoute)

export default app
