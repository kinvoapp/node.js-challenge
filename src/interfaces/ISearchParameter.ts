import { IControllerPagination } from "./IControllerPagination";

export interface ISearchParameter {
  where: any;
  order: IControllerPagination;
}