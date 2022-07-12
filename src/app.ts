import express from 'express';
import { routerAccount } from './routes/account.routes';
import { transactionRouter } from './routes/transactions.routes';

const app = express();

app.use(express.json());

app.get('', (request, response) => {
  response.json({ message: 'Rota teste!' });
});

app.use('/account', routerAccount);
app.use('/transaction', transactionRouter);

export { app };
