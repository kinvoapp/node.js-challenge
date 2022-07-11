import { app } from "./app";
import Database from "./config/database";


const PORT = 3000;

const server = app.listen(PORT, async() => {
  const database = new Database();
  const dbConn = await database.getConnection();
  console.log(`App on port ${PORT}`)})

process.on('SIGINT', () => {
  server.close();
  console.log('App closed')
})