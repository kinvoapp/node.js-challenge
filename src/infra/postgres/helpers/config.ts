import { ConnectionOptions } from 'typeorm'
import { env } from '@/main/config/env'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: env.posstgres.host,
  port: env.posstgres.port,
  username: env.posstgres.username,
  database: env.posstgres.database,
  password: env.posstgres.password,
  entities: ['dist/infra/postgres/entities/index.js'],
  migrations: ['dist/infra/typeorm/migrations/index.js'],
  cli: {
    entitiesDir: 'dist/infra/postgres/entities',
    migrationsDir: 'dist/infra/typeorm/migrations'
  }
}
