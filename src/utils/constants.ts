import 'dotenv/config';

export const constants = {
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    key: '$y64Uo34JOEI',
    expiresIn: '1d',
  }
}