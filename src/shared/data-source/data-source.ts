import { DataSource } from "typeorm"
import * as ormconfig from '../../../ormconfig.js';

export const AppDataSource = new DataSource(ormconfig)

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
