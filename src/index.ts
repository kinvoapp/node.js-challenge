require('dotenv').config()
import { expressMiddleware } from '@apollo/server/express4'
import express, { json } from 'express'
import cors from 'cors'
import { expressjwt } from 'express-jwt'
import createApolloServer from './gql'
import envVariables from './env'

async function main() {
  const server = express()

  server.use(
    expressjwt({
      secret: envVariables.JWT_SECRET,
      algorithms: ['HS256'],
      credentialsRequired: false,
    })
  )

  const apolloServer = await createApolloServer()
  await apolloServer.start()

  server.use(cors<cors.CorsRequest>())
  server.use(json())
  server.use(
    '/api',
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        // @ts-ignore
        const user = req.auth || null

        return { user }
      },
    })
  )

  const port = parseInt('gql', 36)
  server.listen(port, () => {
    console.log(`running on http://localhost:${port}`)
  })
}

main()
