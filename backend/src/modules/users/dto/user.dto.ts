// user.dto.ts
import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export enum RoleEnum {
  Admin = 'Admin',
  Member = 'Member',
}

@ObjectType()
@ArgsType()
export class UserType {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty({ message: 'Email ko de trong' })
  @IsEmail({}, { message: 'Email ko dung dinh dang' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Phone ko de trong' })
  phone: string;

  @Field()
  @IsNotEmpty({ message: 'Address ko de trong' })
  address: string;

  @Field()
  avatar: string;

  @Field({ defaultValue: RoleEnum.Member })
  role?: RoleEnum;

  @Field({ defaultValue: false })
  isActive: boolean;
}

@InputType()
@ArgsType()
export class RegisterUserInput extends OmitType(UserType, ['id', 'avatar']) {
  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  avatar?: string;

  @Field()
  role?: RoleEnum.Member;
}
export class UpdateUserInput extends RegisterUserInput {
  @Field()
  @IsUUID()
  id: string;
}

@InputType()
@ArgsType()
export class FilterDto {
  @Field({ nullable: true })
  @IsOptional()
  isActive: boolean;

  @Field({ nullable: true })
  @IsOptional()
  s: string;
}
