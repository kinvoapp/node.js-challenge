import express from 'express';

export class App {
  private PORT = process.env.PORT || 3000;
  private express: express.Application;

  constructor() {
    this.express = express();
    this.routes();
    this.listen();
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
    this.express.listen(this.PORT, () => console.log('Servidor rodando na porta 3000...'));
  }
  
}