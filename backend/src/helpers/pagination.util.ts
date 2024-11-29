import { PaginationResponse } from "@/modules/base/dto/pagination.response";
import parseQuery from 'api-query-params';
import { FindOptionsOrder, Repository } from 'typeorm';

export async function paginate<T>(
  repository: Repository<T>,
  query: any,
): Promise<PaginationResponse<T>> {
  // Parse the query using api-query-params
  const { filter, sort, limit = 10, skip = 0 } = parseQuery(query);

  // Fetch items and total count
  const [items, total] = await repository.findAndCount({
    where: filter,
    order: sort as FindOptionsOrder<T>,
    take: limit,
    skip,
  });
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  return {
    result: items,
    meta: {
      currentPage, //trang hiện tại
      pageSize: limit, //số lượng bản ghi đã lấy
      pages: totalPages, //tổng số trang với điều kiện query
      total: total,
      totalPages
    },
  };
}
