import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { CreateTransactionService } from "../services/CreateTransactionService";
import { ListTransactionsService } from "../services/ListTransactionsService";


class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { type, value, user_id } = request.body;

    console.log(type)

    const createTransactionService = container.resolve(CreateTransactionService);

    const newTransaction = await createTransactionService.execute(type, value, user_id)

    return response.status(200).json(newTransaction)
  }

  public async listTransactions(request: Request, response: Response): Promise<Response> {

    const { user_id } = request.params;

    const listTransactionsService = container.resolve(ListTransactionsService)

    const transactions = await listTransactionsService.execute(user_id)

    return response.status(200).json(transactions)
  }
}

export {TransactionsController}