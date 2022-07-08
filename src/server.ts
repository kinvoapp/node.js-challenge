import { app } from "./app";


const PORT = 1000;

const server = app.listen(PORT, () => console.log(`App na porta ${PORT}`))

process.on('SIGINT', () => {
  server.close();
  console.log('App finalizado.')
})