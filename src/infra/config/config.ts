require('dotenv').config();

const dev = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: 'finances',
};

export { dev };
