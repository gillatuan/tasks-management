// auth.resolver.ts
import { AuthService } from '@/auth/auth.service';
import { Public } from '@/helpers/setPubicPage';
import { RegisterUserInput } from '@/modules/users/dto/user.dto';
import { User } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JWTAccessToken } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @Mutation(() => JWTAccessToken)
  @Public()
  login(@Args('email') email: string, @Args('password') password: string): JWTAccessToken {
    return {accessToken: 'ewoiweofi'};
  }

  @Query(() => String)
  getProfile() {
    return 'getProfile';
  }

  /* @Mutation(() => String)
  @Public()
  @UseGuards(LocalStrategy)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(loginInput);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.authService.createAccessToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);

    // Lưu refresh token vào cookie HTTPOnly và Secure
    res.setHeader('Set-Cookie', [
      `Refresh=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`, // 7 ngày
      `Access=${accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${15 * 60}`, // 15 phút
    ]);

    return { ...accessToken };
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
