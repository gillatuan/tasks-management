import { PaginationResponse } from '@/modules/base/dto/pagination.response';
import aqp from 'api-query-params';
import { FindOptionsOrder, FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

export async function paginate<T>(
  repository: Repository<T>,
  filter: Record<string, any>,
  sort: FindOptionsOrder<T>,
  limit: number = 10,
  page: number = 1,
  skip: number = 0,
): Promise<PaginationResponse<T>> {
  const [data, total] = await repository.findAndCount({
    where: filter,
    skip,
    take: limit,
    order: sort,
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
