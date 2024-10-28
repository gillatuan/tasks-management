import { UpdateUserInput } from '@/modules/users/dto/update-user.input';
import {
  FilterDto,
  RegisterInput,
  UserType,
} from '@/modules/users/dto/user.dto';
import { UsersService } from '@/modules/users/users.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  async hello() {
    return await 'world';
  }
  
  @Mutation(() => UserType)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.usersService.register(registerInput);
  }

 /*  @Query(() => [UserType])
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => [UserType])
  searchTerms(@Args('filterDto') filterDto: FilterDto) {
    return this.usersService.searchTerms(filterDto);
  }

  @Query(() => UserType)
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserType)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserType)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  } */
}
