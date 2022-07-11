import {
  ICreateTransactionResponse,
  IUpdateTransactionData,
} from "../../../requestDto";

export interface IUpdateTransactionService {
  execute(
    transactionId: string,
    accountId: string,
    data: IUpdateTransactionData
  ): Promise<ICreateTransactionResponse>;
}
