import { UsersService } from '@/modules/users/users.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const user = await this.userService.findByEmail(loginInput.email);
    if (!user) {
      throw new NotFoundException('Khong co use nay');
    }

    const isMatch = await bcrypt.compare(loginInput.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Mat khau ko chinh xac');
    }

    const { password, isActive, codeExpired, codeId, ...result } = user;
    return result;
  }

  async createAccessToken(user: AuthPayload) {
    const payload = { sub: user.id, ...user };
    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }

  async createRefreshToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return await this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
