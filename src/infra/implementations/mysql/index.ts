import { dev } from './config/config';

const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: dev.host,
  user: dev.user,
  password: dev.password,
  database: dev.database,
});

export { db };
