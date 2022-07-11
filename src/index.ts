import { App } from './App';

const PORT = process.env.PORT || 3000;

const app = new App().getApp();
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}...`));