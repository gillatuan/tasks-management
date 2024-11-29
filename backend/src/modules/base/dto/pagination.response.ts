import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaginationDto } from "./pagination.dto";

@ObjectType()
export class PaginationResponse<T> {
  @Field(() => [Object])
  result: T[]; // The list of items in the current page

  @Field(() => Object)
  meta: PaginationDto;
}
