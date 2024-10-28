// user.dto.ts
import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

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
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Phone ko de trong' })
  phone: string;

  @Field()
  @IsNotEmpty({ message: 'Address ko de trong' })
  address: string;

  @Field()
  image: string;

  @Field()
  role?: RoleEnum;

  @Field()
  isActive?: boolean;
}

@InputType()
@ArgsType()
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email ko dung dinh dang' })
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsNotEmpty()
  image?: string;

  @Field({ defaultValue: RoleEnum.Member })
  @IsEmpty()
  role?: RoleEnum;
}

@InputType()
@ArgsType()
export class FilterDto {
  @Field({ nullable: true })
  @IsOptional()
  isActive: boolean;

  @Field({ nullable: true })
  @IsOptional()
  s?: string;
}

@InputType()
@ArgsType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
