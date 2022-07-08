import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'motty.db.elephantsql.com',
  port: 5432,
  username: 'qdjukese',
  database: 'qdjukese',
  password: 'yXRF-A25R5c0m3e_Pkt-5J5RF-ds-OkV',
  entities: ['dist/infra/postgres/entities/index.js']
}
