import { IBalanceInfoWithType } from "../../../requestDto";

export interface IDeleteTransactionRepository {
  deleteTransaction(
    id: string,
    balanceInfo: IBalanceInfoWithType
  ): Promise<void>;
}
