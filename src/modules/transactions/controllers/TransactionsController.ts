import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { CreateTransactionService } from "../services/CreateTransactionService";
import { DeleteTransactionService } from "../services/DeleteTransactionService";
import { ListTransactionsService } from "../services/ListTransactionsService";
import { UpdateTransactionService } from "../services/UpdateTransactionService";


class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { type, value, user_id } = request.body;
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

  public async update(request: Request, response: Response): Promise<Response> {
    const {transaction_id} = request.params
    const { type, value, user_id } = request.body;
    const updateTransactionService = container.resolve(UpdateTransactionService);

    const newTransaction = await updateTransactionService.execute(transaction_id, type, value, user_id)

    return response.status(200).json(newTransaction)
  }

    public async delete(request: Request, response: Response): Promise<Response> {
      const { transaction_id } = request.params
      const { user_id } = request.body
      const deleteTransactionService = container.resolve(DeleteTransactionService);

    const newTransaction = await deleteTransactionService.execute(transaction_id, user_id)

    return response.status(200).json(newTransaction)
  }

}

export {TransactionsController}