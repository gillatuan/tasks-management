import {
  FilterDto,
  RegisterUserInput,
  UpdateUserInput,
  UserType,
} from '@/modules/users/dto/user.dto';
import { UsersService } from '@/modules/users/users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  async helloo() {
    return await 'world';
  }

  @Query(() => UserType)
  async findOne(@Args('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Query(() => [User])
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => [User])
  async searchTerms(@Args('filterDto') filterDto: FilterDto): Promise<User[]> {
    return await this.usersService.searchTerms(filterDto);
  }

  @Mutation(() => User)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<User> {
    return await this.usersService.register(registerUserInput);
  }

  @Mutation(() => String)
  async removeUser(@Args('id') id: string): Promise<String> {
    return await this.usersService.remove(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.usersService.update(id, updateUserInput);
  }
}
