// config inicial
import express, { Request, Response } from 'express';
import cors from 'cors';
import app from './database/conn';

import userRoutes from './routes/userRoutes';
import moveRoutes from './routes/moveRoutes';
import statementRoutes from './routes/statementRoutes';

app.use(express.json());
app.use(cors());

// rotas da API
app.use('/user', userRoutes);
app.use('/move', moveRoutes);
app.use('/statement', statementRoutes);

app.get('/', (_, res: Response) => {
  res.json({ message: 'Hello Express!' });
});
