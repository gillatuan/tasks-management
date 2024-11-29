import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@ArgsType()
export class PaginationDto {

  @Field()
  pageSize: number;

  @Field()
  pages: number;

  @Field()
  total: number;

  @Field(() => Int)
  currentPage: number; // Current page number

  @Field(() => Int)
  totalPages: number; // Total number of pages
}
