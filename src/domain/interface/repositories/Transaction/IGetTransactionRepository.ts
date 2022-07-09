import { ICreateTransactionResponse } from "../../../requestDto";

export interface IGetTransactionRepository {
  getTransaction(
    id: string,
    accountId: string
  ): Promise<ICreateTransactionResponse | null>;
}
