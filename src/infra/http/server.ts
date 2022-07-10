import { app } from './app'
import { prisma, prismaConnect } from '../prisma/client'

app.listen(3333, async () => {
  console.log('server is up and running')
  await prismaConnect(prisma)
})
