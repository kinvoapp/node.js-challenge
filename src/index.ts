import express from "express";

const server = express();

const port = parseInt("gql", 36);
server.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
