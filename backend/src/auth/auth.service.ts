import { User } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import {
  AuthPayload,
  AuthRegisterInput,
  JWTAccessToken,
  LoginInput,
  UserPayload,
} from './dto/auth.dto';

import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(authRegisterInput: AuthRegisterInput): Promise<User> {
    return this.userService.register(authRegisterInput);
  }

  async validateUser(loginInput: LoginInput): Promise<AuthPayload> | null {
    const user = await this.userService.findByEmail(loginInput.email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(loginInput.password, user.password);
    if (!isMatch) {
      return null;
    }

    const { password, isActive, codeExpired, codeId, ...result } = user;
    return result;
  }

  async createAccessToken(payload: UserPayload) {
    return await this.jwtService.sign(payload);
  }

  async createRefreshToken(payload: UserPayload, id: string, res: Response) {
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    //update user with refresh token
    this.userService.updateUserToken(refreshToken, id);

    //set refreshToken as cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRED')),
    });

    return refreshToken
  }

  async login(user: AuthPayload, res: Response): Promise<JWTAccessToken> {
    const payload = {
      sub: 'token login',
      iss: 'from server',
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const refreshToken = await this.createRefreshToken(user, user.id, res);
    const accessToken = await this.createAccessToken(payload);

    return {
      accessToken,
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role,
        // permissions
      },
    };
  }
}
