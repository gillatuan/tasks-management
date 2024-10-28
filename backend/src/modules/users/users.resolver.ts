import {
  RegisterInput,
  UpdateUserInput,
  UserType,
} from '@/modules/users/dto/user.dto';
import { UsersService } from '@/modules/users/users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  async helloo() {
    return await 'world';
  }

  @Mutation(() => UserType)
  register(@Args('registerUserInput') registerUserInput: RegisterInput) {
    return this.usersService.register(registerUserInput);
  }

  @Query(() => [UserType])
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserType)
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => String)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @Mutation(() => UserType)
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  /*  
  @Query(() => [UserType])
  searchTerms(@Args('filterDto') filterDto: FilterDto) {
    return this.usersService.searchTerms(filterDto);
  } */
}
