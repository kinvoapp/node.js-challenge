import mongoose from 'mongoose';
import express from 'express';

const DB_USER = '';
const DB_PASS = '';
const DB_CLUSTER = '';
const DB_NAME = '';
const DB_URL = '';

const conn = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`;

const app = express();

mongoose.connect(conn)
    .then(() => {
        console.log('DB connected...')
        app.listen(3001)
    })
    .catch((err) => console.log(err));

export default app;
