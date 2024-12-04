import { PaginationResponse } from '@/modules/base/dto/pagination.response';
import aqp from 'api-query-params';

export async function paginate<T>(
  query: string,
  opt: Object,
  limit: number = 10,
  skip: number = 0,
): Promise<PaginationResponse<T>> {
  const { filter, sort } = aqp(query, opt);
  const page = Math.floor(skip / limit) + 1;

  const [data, total] = await this.userRepository.findAndCount({
    where: filter,
    skip,
    take: limit,
    order: sort,
    select: {
      password: false,
      id: true,
      email: true,
      phone: true,
      address: true,
      avatar: true,
      role: true,
    },
  });

  const totalPages = Math.ceil(total / limit);
  // Parse the query using api-query-params

  return {
    result: data,
    meta: {
      page, //trang hiện tại
      pageSize: limit, //số lượng bản ghi đã lấy
      totalPages: totalPages, //tổng số trang với điều kiện query
      total,
    },
  };
}
