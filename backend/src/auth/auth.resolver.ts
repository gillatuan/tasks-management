// auth.resolver.ts
import { AuthService } from '@/auth/auth.service';
import {
  AuthPayload,
  AuthRegisterInput,
  JWTAccessToken,
  LoginInput,
} from '@/auth/dto/auth.dto';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { Public } from '@/helpers/setPubicPage';
import { UserType } from '@/modules/users/dto/user.dto';
import { User } from '@/modules/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserType)
  @Public()
  authRegister(
    @Args('authRegisterInput') authRegisterInput: AuthRegisterInput,
  ): Promise<User> {
    return this.authService.register(authRegisterInput);
  }

  @Mutation(() => JWTAccessToken)
  @Public()
  @UseGuards(LocalAuthGuard)
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Context('res') res,
  ): Promise<JWTAccessToken> {
    const userPayload = res.req.user as AuthPayload;
    return this.authService.login(userPayload, res);
  }
}
