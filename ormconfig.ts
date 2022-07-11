import { DataSource } from "typeorm";

const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'kinvo-project-db',
  logging: false,
  synchronize: false,
  name: 'deafault',
  "entities": [
      "src/modules/**/model/*.ts"
   ],
   "migrations": [
      "src/shared/migrations/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
  ],
})

export default connectionSource