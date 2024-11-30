import { PaginationResponse } from '@/modules/base/dto/pagination.response';

export async function paginate<T>(
  items: T[],
  total: number,
  limit: number = 10,
  skip: number = 0,
): Promise<PaginationResponse<T>> {
  const totalPages = Math.ceil(total / limit);
  const page = Math.floor(skip / limit) + 1;

  return {
    result: items,
    meta: {
      page, //trang hiện tại
      pageSize: limit, //số lượng bản ghi đã lấy
      totalPages: totalPages, //tổng số trang với điều kiện query
      total,
    },
  };
}
