// auth.resolver.ts
import { AuthService } from '@/auth/auth.service';
import { Public } from '@/helpers/setPubicPage';
import { RegisterUserInput } from '@/modules/users/dto/user.dto';
import { User } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JWTAccessToken } from './dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => String)
  async authRegister(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<User> {
    return await this.userService.register(registerUserInput);
  }

  @Query(() => String)
  getProfile() {
    return 'getProfile';
  }

  @Mutation(() => String)
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
  }

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
