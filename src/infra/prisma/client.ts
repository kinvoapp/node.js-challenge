import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const prismaConnect = async (prisma: PrismaClient) => {
  await prisma.$connect()
  console.log('prisma connection is good to go')
}

export { prisma, prismaConnect }
