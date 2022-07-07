// import * as dotenv from 'dotenv'
import express from "express";
import cors from "cors"
// import router from './routes/router'

const app = express();

// dotenv.config()

app.use(cors());

app.use(express.json());

// app.use(router);



export default app;