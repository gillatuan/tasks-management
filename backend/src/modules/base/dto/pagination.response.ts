import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto } from './pagination.dto';
import { IsOptional } from "class-validator";

@ObjectType({ isAbstract: true })
export class PaginationResponse<T> {
  @Field()
  result: T[];

  @Field()
  meta: PaginationDto;
}
