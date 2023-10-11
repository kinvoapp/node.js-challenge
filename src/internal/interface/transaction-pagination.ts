import { Pagination } from "./pagination";

export interface PaginationResponse<T> {
  count: number;
  next: Pagination | null;
  previous: Pagination | null;
  items: T[];
}
