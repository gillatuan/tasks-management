import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthPayload, LoginInput } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginInput: LoginInput): Promise<AuthPayload> | null {
    const { email, password } = loginInput;
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, isActive, codeExpired, codeId, ...result } = user;
      return result;
    }
    return null;
  }

  async createAccessToken(user: AuthPayload) {
    const payload = { sub: user.id, ...user };
    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }

  async createRefreshToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
