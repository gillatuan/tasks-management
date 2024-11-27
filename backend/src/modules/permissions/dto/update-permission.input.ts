import { CreatePermissionInput } from '@/modules/permissions/dto/create-permission.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @Field(() => Int)
  id: number;
}
