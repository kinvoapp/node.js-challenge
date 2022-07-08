import express from 'express';

export class App {
  private PORT = process.env.PORT || 3000;
  private express: express.Application;

  constructor() {
    this.express = express();
    this.listen();
    this.routes();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private routes(): void {
    this.express.get('/', (req, res) => {
      return res.status(200).json({ message: 'Olá!' });
    });
  }

  private listen(): void {
    this.express.listen(3000, () => console.log('Servidor rodando na porta 3000...'));
  }
  
}