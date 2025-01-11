import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@ArgsType()
export class PaginationDto {
  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number; // Current page number

  @Field(() => Int)
  totalPages: number; // Total number of pages
}
