import express from 'express';
import { Database } from './database/Database';
import movementController from './routes/controllers/movementController';
import authController from './routes/controllers/authController';

export class App {
  private express: express.Application;

  constructor() {
    this.express = express();
    this.database();
    this.middleware();
    this.routes();
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
    this.express.use('/api/auth', authController);
  }
}