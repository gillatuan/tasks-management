import { Public } from "@/helpers/setPubicPage";
import {
  FilterDto,
  RegisterUserInput,
  UpdateUserInput,
  UserType,
} from '@/modules/users/dto/user.dto';
import { User } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  @Public()
  async helloo() {
    return await 'world';
  }

  @Query(() => UserType)
  async findOne(@Args('id') id: string): Promise<User | string> {
    return await this.usersService.findOne(id);
  }

  @Query(() => [UserType])
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => [UserType])
  async searchTerms(@Args('filterDto') filterDto: FilterDto): Promise<User[]> {
    return await this.usersService.searchTerms(filterDto);
  }

  @Query(() => UserType)
  async findByEmail(@Args('email') email: string): Promise<User> {
    return await this.usersService.findByEmail(email);
  }

  @Mutation(() => UserType)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<User> {
    return await this.usersService.register(registerUserInput);
  }

  @Mutation(() => String)
  async removeUser(@Args('id') id: string): Promise<String> {
    return await this.usersService.remove(id);
  }

  @Mutation(() => String)
  async updateUser(
    @Args('id') id: string,
    @Args() updateUserInput: UpdateUserInput,
  ): Promise<string> {
    return await this.usersService.updateUser(id, updateUserInput);
  }
}
