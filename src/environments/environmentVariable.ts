require('dotenv').config();

export const environment = {
  jwtSecret: process.env.SECRET || 'dtb154h6t46',
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: 'finances',
};
