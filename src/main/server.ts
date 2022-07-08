import './config/module-alias'
import { config } from '@/infra/postgres/helpers'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

createConnection(config)
  .then(() => app.listen(env.port, () => console.log(`Sever runnig at: http://localhost:${env.port}`)))
  .catch(console.error)
