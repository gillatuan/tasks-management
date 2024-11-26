import { RoleEnum } from '@/modules/users/dto/user.dto';
import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
@ArgsType()
export class AuthRegisterInput {
  @IsNotEmpty({ message: 'Email ko de trong' })
  @IsEmail({}, { message: 'Email ko dung dinh dang' })
  email: string;

  @IsNotEmpty({ message: 'Password ko de trong' })
  password: string;

  @IsNotEmpty({ message: 'Phone ko de trong' })
  phone: string;

  @IsNotEmpty({ message: 'Address ko de trong' })
  address: string;

  @Field()
  avatar?: string;

  @Field()
  role?: RoleEnum;
}

@InputType()
@ArgsType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@ObjectType()
export class AuthPayload {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  @IsOptional()
  providerId?: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field()
  @IsOptional()
  avatar?: string;

  @Field()
  @IsOptional()
  role?: RoleEnum;
}

@ObjectType()
export class UserPayload {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  @IsOptional()
  role?: RoleEnum;
}

@ObjectType()
export class JWTAccessToken {
  @Field()
  accessToken: string;

  @Field()
  user: UserPayload;
}
