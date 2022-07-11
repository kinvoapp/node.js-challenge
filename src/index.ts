import dotenv from 'dotenv';
dotenv.config();

import express,{Request, Response}  from "express";
import { useRoutes } from './routes';
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());

useRoutes(app);





app.listen(PORT, () => console.log('Servidor inciado na porta' + PORT));