import {
  ICreateTransactionResponse,
  ITransactionPaginationRequest,
} from "../../../requestDto";

export interface IGetTransactionsRepository {
  getTransactions(
    accountId: string,
    filters: ITransactionPaginationRequest
  ): Promise<ICreateTransactionResponse[]>;
}
