import express from 'express'
import Routes from './routes/finance'
import * as mongoose from 'mongoose';

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', Routes)




export default app;