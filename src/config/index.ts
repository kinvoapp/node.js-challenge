// adicionar os process.env
import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
    "DATABASE_URL": process.env.DATABASE_URL,
    "JWT_SECRET": process.env.JWT_SECRET
}
