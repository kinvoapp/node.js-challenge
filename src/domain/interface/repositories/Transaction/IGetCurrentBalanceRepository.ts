export interface IGetCurrentBalanceRepository {
  getCurrentBalance(accountId: string): Promise<number>;
}
