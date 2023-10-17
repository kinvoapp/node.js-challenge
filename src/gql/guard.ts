import { rule, shield } from 'graphql-shield'
import { ApolloContext } from './context'

const isAuthenticated = rule()((_parent: any, _args: any, { user }: ApolloContext) => {
  return user !== null
})

const permissions = shield({
  Query: {
    users: isAuthenticated,
    transactions: isAuthenticated,
  },
  Mutation: {
    newTransaction: isAuthenticated,
    updateTransaction: isAuthenticated,
    deleteTransaction: isAuthenticated,
  },
})

export default permissions
