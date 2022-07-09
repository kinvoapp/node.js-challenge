import { getErrorMessage } from "../../utils/handleErrors";
import prisma from "../../database/client";
import { RequestHandler } from "express";
import { formatToCurrency } from "../../utils/formatToCurrency";


export const getBalance: RequestHandler = async (req, res) => {
    const id = '1'
    try {

        const [sumCredit, sumDebit] = await prisma.$transaction([
            prisma.transactions.aggregate({
                _sum: {
                    amount: true
                }, where:
                {
                    user_id: id,
                    type: 'credit'

                }
            }),
            prisma.transactions.aggregate({
                _sum: {
                    amount: true
                }, where: {
                    user_id: id,
                    type: 'debit'

                }
            })
        ])

        const userBalance = (Number(sumCredit._sum.amount) - Number(sumDebit._sum.amount)) / 100


        return res.status(201).send({ data: `O seu saldo é de R$ ${formatToCurrency(userBalance)}` })

    } catch (e) {

        return res.status(400).json({ error: getErrorMessage(e) })

    }
}