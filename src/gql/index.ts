import {addResolversToSchema} from '@graphql-tools/schema'
import getTypeDefs from './type-defs'
import resolvers from './resolvers'
import {ApolloServer} from '@apollo/server'

export default async function createApolloServer() {
  const schema = addResolversToSchema({
    schema: await getTypeDefs(),
    resolvers,
  })

  return new ApolloServer({
    schema,
    formatError(formattedError, _error) {
      return formattedError
    },
  })
}
