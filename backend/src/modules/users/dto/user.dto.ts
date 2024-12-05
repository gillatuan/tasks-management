// user.dto.ts
import { BaseEntity } from '@/modules/base/entity/base.entity';
import { PaginationDto } from '@/modules/base/dto/pagination.dto';
import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export enum RoleEnum {
  Admin = 'Admin',
  Member = 'Member',
}

@ObjectType()
@ArgsType()
export class UserType extends BaseEntity {
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
  @IsOptional()
  role?: RoleEnum;

  @Field({ defaultValue: false })
  isActive?: boolean;
}

@InputType()
@ArgsType()
export class FilterDto {
  @Field({ nullable: true })
  @IsOptional()
  s: string;
}

@ObjectType()
export class UserPaginationResponse {
  @Field(() => [UserType], { nullable: true })
  @IsOptional()
  result: UserType[];

  @Field()
  meta: PaginationDto;
}
