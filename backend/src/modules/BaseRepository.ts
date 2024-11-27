import { Repository } from "typeorm";

class BaseRepository<Entity> extends Repository<Entity> {
  async getPaginatedData(limit: number, offset: number) {
    const [data, total] = await this.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      result: data,
      count: total,
    };
  }
}
