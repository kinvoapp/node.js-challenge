import userRoutes from './userRoutes';
import transactionRoutes from './transactionRoutes';

export default (app: any) => {
  app.use(
    userRoutes,
    transactionRoutes
  );
}