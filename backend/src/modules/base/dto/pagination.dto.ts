import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@ArgsType()
export class PaginationDto {
  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number; // Current page number

  @Field(() => Int)
  totalPages: number; // Total number of pages
}
