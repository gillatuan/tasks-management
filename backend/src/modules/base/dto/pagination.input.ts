import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  filter?: string; // JSON string for filtering

  @Field({ nullable: true })
  sort?: string; // JSON string for sorting

  @Field({ nullable: true })
  limit?: number; // Limit for pagination

  @Field({ nullable: true })
  skip?: number; // Offset for pagination
}
