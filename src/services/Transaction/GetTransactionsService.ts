import { NotFound } from "../../domain/error";
import { IFindAccountByIdRepository } from "../../domain/interface/repositories/Account/IFindAccountByIdRepository";
import { IGetTransactionsRepository } from "../../domain/interface/repositories/Transaction/IGetTransactionsRepository";
import { IGetTransactionService } from "../../domain/interface/services/Transaction/IGetTransactionService";
import {
  ITransactionPaginationRequest,
  ITransactionPaginationResponse,
} from "../../domain/requestDto";

export class GetTransactionsService implements IGetTransactionService {
  private getTransactionsRepository: IGetTransactionsRepository;
  private findAccountByIdRepository: IFindAccountByIdRepository;

  constructor(
    getTransactionsRepository: IGetTransactionsRepository,
    findAccountByIdRepository: IFindAccountByIdRepository
  ) {
    this.getTransactionsRepository = getTransactionsRepository;
    this.findAccountByIdRepository = findAccountByIdRepository;
  }
  async execute(
    accountId: string,
    filters: ITransactionPaginationRequest
  ): Promise<ITransactionPaginationResponse> {
    const account = await this.findAccountByIdRepository.findAccountById(
      accountId
    );
    if (!account) {
      throw new NotFound("Account not found");
    }
    const transactions = await this.getTransactionsRepository.getTransactions(
      accountId,
      filters
    );
    const transactionsResponse: ITransactionPaginationResponse = {
      transactions,
      pagination: {
        currentPage: filters.currentPage,
        itemsPerPage: filters.itemsPerPage,
      },
    };

    return transactionsResponse;
  }
}
