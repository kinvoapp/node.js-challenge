import {
  IBalanceInfo,
  ICreateTransactionResponse,
  IUpdateTransactionData,
} from "../../../requestDto";

export interface IUpdateTransactionRepository {
  updateTransaction(
    id: string,
    data: IUpdateTransactionData,
    balanceInfo?: IBalanceInfo
  ): Promise<ICreateTransactionResponse>;
}
