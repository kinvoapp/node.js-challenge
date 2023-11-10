import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()
prismaClient.$connect()

export default prismaClient
