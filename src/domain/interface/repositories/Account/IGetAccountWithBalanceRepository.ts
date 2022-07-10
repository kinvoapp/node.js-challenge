import { IGetAccountWithBalanceInfo } from "../../../requestDto";

export interface IGetAccountWithBalanceRepository {
  getAccountWithBalance(
    accountId: string
  ): Promise<IGetAccountWithBalanceInfo | null>;
}
