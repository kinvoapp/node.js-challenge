import {
  ICreateAccountRequest,
  ICreateAccountResponse,
} from "../../../requestDto";

export interface ICreateAccountRepository {
  createAccount(data: ICreateAccountRequest): Promise<ICreateAccountResponse>;
}
