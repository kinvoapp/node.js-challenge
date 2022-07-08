import express, {Request, Response} from 'express'
import cors from 'cors'
import logger from 'morgan'

export const app = express()

app.use(cors())

app.use(express.json())

app.use(logger('dev'))

app.use('/', (req: Request , res: Response) => {
    res.send('Opa')
})