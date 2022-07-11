import app from "./app";
import { AppDataSource } from "./infra/database/typeorm.connection";

const PORT = process.env.SERVER_PORT || 3000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
