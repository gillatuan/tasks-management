// auth.resolver.ts
import { AuthService } from '@/auth/auth.service';
import { Public } from '@/helpers/setPubicPage';
import { User } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthRegisterInput, JWTAccessToken, LoginInput } from './dto/auth.dto';
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

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
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Res({ passthrough: true }) res,
  ): Promise<JWTAccessToken> {
    return this.authService.login(loginInput)
  }

  /* @Mutation(() => String)
  @Public()
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Res({ passthrough: true }) res,
  ): Promise<JWTAccessToken> {
    const user = await this.authService.validateUser({
      email,
      password,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.createAccessToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);

    return { accessToken: token.accessToken, refreshToken };
  } */

  /* @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as AuthPayload;

    // Tạo access token mới
    const accessToken = await this.authService.createAccessToken(user);
    return { ...accessToken };
  }

  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Refresh');
    return { message: 'Logged out' };
  } */
}
