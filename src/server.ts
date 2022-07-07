import app from "./app";
import "reflect-metadata";

try {
  app.listen(process.env.PORT, () =>
    console.log(`Server is running on port (${process.env.PORT})`)
  );
} catch (err) {
  console.log(err);
}
