const routes = require("express").Router();

routes.get("/", (_req, res) => {
  res.status(200).json({ app: "Cada centavo" });
});

module.exports = routes;
