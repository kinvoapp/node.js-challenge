import { formatToCurrency } from "../../utils/formatToCurrency"
import prisma from "../../database/client"

export const sumTransactionService = async (id: string) => {
    const sumCredit = await prisma.transactions.aggregate({
        _sum: {
            amount: true
        }, where:
        {
            user_id: id,
            type: 'credit'

        }
    })

    const sumDebit = await prisma.transactions.aggregate({
        _sum: {
            amount: true
        }, where: {
            user_id: id,
            type: 'debit'

        }
    })

    const userBalance = (Number(sumCredit._sum.amount) - Number(sumDebit._sum.amount)) / 100
    return { message: `O seu saldo é de R$ ${formatToCurrency(userBalance)}` }
}
