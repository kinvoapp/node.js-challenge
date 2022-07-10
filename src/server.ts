import dotenv from "dotenv";
import app from "./app";
dotenv.config();

const PORT = process.env.PORT || 3000;

const HOSTNAME = process.env.HOSTNAME || "localhost";

app.listen(PORT, () => {
  console.log(`Server is running on: ${HOSTNAME}:${PORT}`);
});
