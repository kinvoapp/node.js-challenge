import { IGetAccountWithBalanceInfo } from "../../../requestDto";

export interface IGetAccountBalanceService {
  execute(accountId: string): Promise<IGetAccountWithBalanceInfo>;
}
