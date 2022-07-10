import express from "express";

const app = express();

app.use(express.json({ type: ["application/json", "text/plain"] }));

export { app };
