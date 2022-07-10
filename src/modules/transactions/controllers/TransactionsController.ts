import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { CreateTransactionService } from "../services/CreateTransactionService";
import { DeleteTransactionService } from "../services/DeleteTransactionService";
import { FilterTransactionsByDateService } from "../services/FilterTransactionsByDateService";
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
    const page: number = parseInt(request.query.page as string) || 1;
    const perPage: number = parseInt(request.query.perPage as string) || 5;
    const { initial_date, final_date } = request.body
    

    if (initial_date && final_date) {
      const filterTransactionsByDate = container.resolve(FilterTransactionsByDateService)
      const transactions = await filterTransactionsByDate.execute(user_id, initial_date, final_date, page, perPage);

    return response.status(200).json({
      data: transactions.transactions,
      total: transactions.total,
      page: page,
      last_page: Math.ceil(transactions.total / perPage)
    })
    }

    const listTransactionsService = container.resolve(ListTransactionsService)
    const transactions = await listTransactionsService.execute(user_id, page, perPage)



    return response.status(200).json({
      data: transactions.transactions,
      total: transactions.total,
      page: page,
      last_page: Math.ceil(transactions.total / perPage)
    })
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