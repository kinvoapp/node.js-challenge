import { Sequelize } from 'sequelize';
import { dev } from '../config/config';

export const sequelize = new Sequelize(dev.database, dev.user, dev.password, {
  dialect: 'mysql',
  host: dev.host,
});

sequelize.authenticate();
