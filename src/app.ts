import express from 'express'

import HelloRoute from '@routes/hello.routes'
import MovementRoute from '@routes/movement.routes'

const app = express()

app.use(express.json())

app.use('/hello', HelloRoute)
app.use('/movement', MovementRoute)

export default app
