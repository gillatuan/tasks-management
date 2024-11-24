import { UsersService } from '@/modules/users/users.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthPayload, AuthRegisterInput, JWTAccessToken, LoginInput } from './dto/auth.dto';
import { User } from "@/modules/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(authRegisterInput:AuthRegisterInput): Promise<User> {
    return this.userService.register(authRegisterInput)
  }

  async validateUser(loginInput: LoginInput): Promise<AuthPayload> | null {
    const user = await this.userService.findByEmail(loginInput.email);
    if (!user) {
      return null
    }

    const isMatch = await bcrypt.compare(loginInput.password, user.password);
    if (!isMatch) {
      return null
    }

    const { password, isActive, codeExpired, codeId, ...result } = user;
    return result;
  }

  async createAccessToken(user: AuthPayload) {
    const payload = { sub: user.id, ...user };
    return await this.jwtService.sign(payload)
  }

  async createRefreshToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return await this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async login(loginInput: LoginInput): Promise<JWTAccessToken> {
    const user = await this.validateUser(loginInput)
    const accessToken = await this.createAccessToken(user)
    const refreshToken = await this.createRefreshToken(user)

    return {
      accessToken,
      refreshToken,
    };
  }
}
