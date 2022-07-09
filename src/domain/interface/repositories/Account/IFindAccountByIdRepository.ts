import { ICreateAccountResponse } from "../../../requestDto";

export interface IFindAccountByIdRepository {
  findAccountById(id: string): Promise<ICreateAccountResponse | null>;
}
