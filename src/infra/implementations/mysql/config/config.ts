import { environment } from '../../../../environments/environmentVariable';

require('dotenv').config();

const dev = {
  host: environment.host,
  user: environment.user,
  password: environment.password,
  database: environment.database,
};

export { dev };
