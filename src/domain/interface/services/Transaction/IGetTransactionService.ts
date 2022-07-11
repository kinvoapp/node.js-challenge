import {
  ITransactionPaginationRequest,
  ITransactionPaginationResponse,
} from "../../../requestDto";

export interface IGetTransactionService {
  execute(
    accountId: string,
    filters: ITransactionPaginationRequest
  ): Promise<ITransactionPaginationResponse>;
}
