import { expressMiddleware } from "@apollo/server/express4";
import express, { json } from "express";
import cors from "cors";
import createApolloServer from "./gql";

async function main() {
  const server = express();
  const apolloServer = await createApolloServer();

  await apolloServer.start();

  server.use(cors<cors.CorsRequest>());
  server.use(json());
  server.use("/api", expressMiddleware(apolloServer));

  const port = parseInt("gql", 36);
  server.listen(port, () => {
    console.log(`running on http://localhost:${port}`);
  });
}

main();
