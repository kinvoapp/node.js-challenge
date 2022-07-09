import {
  ICreateTransactionRequest,
  ICreateTransactionResponse,
} from "../../../requestDto";

export interface ICreateTransactionRepository {
  createTransaction(
    data: ICreateTransactionRequest,
    newBalance: number,
    accountId: string,
    balanceId: string
  ): Promise<ICreateTransactionResponse>;
}
