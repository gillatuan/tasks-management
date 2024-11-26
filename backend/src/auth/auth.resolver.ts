// auth.resolver.ts
import { AuthService } from '@/auth/auth.service';
import {
  AuthPayload,
  AuthRegisterInput,
  JWTAccessToken,
} from '@/auth/dto/auth.dto';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { Public } from '@/helpers/setPubicPage';
import { User } from '@/modules/users/entities/user.entity';
import { Res, UseGuards } from '@nestjs/common';
import { Args, Context, GqlContextType, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  @Public()
  authRegister(
    @Args('authRegisterInput') authRegisterInput: AuthRegisterInput,
  ): Promise<User> {
    return this.authService.register(authRegisterInput);
  }

  @Mutation(() => JWTAccessToken)
  @Public()
  @UseGuards(LocalAuthGuard)
  login(@Context('res') res): Promise<JWTAccessToken> {
    const userPayload = res.req.user as AuthPayload;
    return this.authService.login(userPayload, res);
  }
}
