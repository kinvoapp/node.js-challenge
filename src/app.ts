import express from 'express';
import { router as accountRoutes } from './routes/account.routes';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.json({ message: 'Rota teste!' });
});

app.use('/', accountRoutes);

export { app };
