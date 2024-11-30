import { ArgsType, Field, InputType, OmitType } from "@nestjs/graphql";
import { RoleEnum, UserType } from "./user.dto";
import { IsNotEmpty } from "class-validator";


@InputType()
@ArgsType()
export class RegisterUserInput extends OmitType(UserType, ['avatar']) {
  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  avatar?: string;

  @Field()
  role?: RoleEnum.Member = RoleEnum.Member;
}