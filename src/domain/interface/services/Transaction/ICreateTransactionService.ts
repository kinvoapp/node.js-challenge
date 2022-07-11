import {
  ICreateTransactionRequest,
  ICreateTransactionResponse,
} from "../../../requestDto";

export interface ICreateTransactionService {
  execute(
    data: ICreateTransactionRequest,
    accountId: string
  ): Promise<ICreateTransactionResponse>;
}
