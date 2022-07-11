import 'reflect-metadata'
import 'express-async-errors';
import express, { Request, Response } from 'express'
import cors from 'cors'
import logger from 'morgan'
import { routes } from './shared/routes'
import './shared/container'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/', routes)
app.use('/', (__: Request , res: Response) => {
    res.send('Opa')
})