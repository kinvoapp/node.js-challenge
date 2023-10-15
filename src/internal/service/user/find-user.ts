import {FindUserDto} from '@/internal/dto/user'
import {UserRepository} from '@/internal/interface/repository/user'
import createPaginationResponse from '@/utils/pagination/pagination'

export default async function findUser(repository: UserRepository, data: FindUserDto) {
  const [count, users] = await Promise.all([repository.findCount(), repository.find(data)])

  return createPaginationResponse({
    count,
    items: users,
    limit: data.limit!,
    offset: data.offset!,
  })
}
