import {Pagination} from '@/internal/interface/pagination'
import {PaginationResponse} from '@/internal/interface/transaction-pagination'

interface CreatePaginationResponse<T> extends Pagination {
  count: number
  items: Array<T>
}

function createPaginationResponse<T>({
  count,
  limit,
  offset,
  items,
}: CreatePaginationResponse<T>): PaginationResponse<T> {
  let previous: Pagination | null = null
  let next: Pagination | null = null

  if (offset) {
    previous = {
      offset: offset - limit < 0 ? 0 : offset - limit,
      limit: offset - limit < 0 ? offset : limit,
    }
  }
  if (count - offset > limit) {
    next = {
      offset: offset + limit,
      limit: count - (offset + limit) < limit ? count - (offset + limit) : limit,
    }
  }

  return {
    count,
    next,
    previous,
    items,
  }
}
export default createPaginationResponse
