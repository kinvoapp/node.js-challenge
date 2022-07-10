import express from 'express';
import { Database } from './database/Database';
import movementController from './routes/controllers/movementController';

export class App {
  private PORT = process.env.PORT || 3000;
  private express: express.Application;

  constructor() {
    this.express = express();
    this.database();
    this.middleware();
    this.routes();
    this.listen();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private async database(): Promise<void> {
    await Database.connect();
  }

  private middleware(): void {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use('/api/movement', movementController);
  }

  private listen(): void {
    this.express.listen(this.PORT, () => console.log('Servidor rodando na porta 3000...'));
  } 
}