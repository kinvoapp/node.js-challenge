import { BaseContext } from '@apollo/server'

export interface ApolloContext extends BaseContext {
  user: {
    email: string
    iat: number
    exp: number
    sub: string
  }
}
