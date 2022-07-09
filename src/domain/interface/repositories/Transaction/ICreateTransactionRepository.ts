import {
  ICreateTransactionRequest,
  ICreateTransactionResponse,
} from "../../../requestDto";

export interface ICreateTransactionRepository {
  createTransaction(
    data: ICreateTransactionRequest,
    currentBalance: number
  ): Promise<ICreateTransactionResponse>;
}
