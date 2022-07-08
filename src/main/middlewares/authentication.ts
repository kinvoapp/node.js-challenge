import { adaptExpressMidleware } from '@/main/adapters/express-middleware'
import { makeAuthenticationMiddleware } from '../factories/middlewares'

export const auth = adaptExpressMidleware(makeAuthenticationMiddleware())
