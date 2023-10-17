import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from 'graphql-middleware'
import getTypeDefs from './type-defs'
import resolvers from './resolvers'
import { ApolloServer } from '@apollo/server'
import { ApolloContext } from './context'
import permissions from './guard'

export default async function createApolloServer() {
  const schema = applyMiddleware(
    makeExecutableSchema({
      typeDefs: await getTypeDefs(),
      resolvers,
    }),
    permissions
  )

  return new ApolloServer<ApolloContext>({
    schema,
    formatError(formattedError, _error) {
      return formattedError
    },
  })
}
