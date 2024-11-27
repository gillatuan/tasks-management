import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PermissionType } from "./dto/permission.dto";
import { ResponseMessage, User } from "@/decorator/customize";
import { IUser } from "../users/users";
import { Get } from "@nestjs/common";

@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Mutation(() => PermissionType)
  @ResponseMessage("Create a new permission")
  create(@Args('createPermissionInput') createPermissionInput: CreatePermissionInput, @User() user: IUser) {
    return this.permissionsService.create(createPermissionInput, user);
  }

  @Get()
  @ResponseMessage("Fetch permissions with paginate")
  findAll(
    @Args("current") currentPage: string,
    @Args("pageSize") limit: string,
    @Args() qs: string
  ) {
    return this.permissionsService.findAll(+currentPage, +limit, qs);
  }

  /* @Get(':id')
  @ResponseMessage("Fetch a permission by id")
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update a permission")
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto, @User() user: IUser) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a permission")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.permissionsService.remove(id, user);
  } */
}
