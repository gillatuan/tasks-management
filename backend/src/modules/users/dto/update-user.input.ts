import { ArgsType, InputType, PartialType } from '@nestjs/graphql';
import { RegisterUserInput } from './create-user.input';

@InputType()
@ArgsType()
export class UpdateUserInput extends PartialType(RegisterUserInput) {}
