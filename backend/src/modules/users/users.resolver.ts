import { RegisterInput, UserType } from '@/modules/users/dto/user.dto';
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
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.usersService.register(registerInput);
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

  /*  
  @Query(() => [UserType])
  searchTerms(@Args('filterDto') filterDto: FilterDto) {
    return this.usersService.searchTerms(filterDto);
  }

  @Mutation(() => UserType)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  } */
}
