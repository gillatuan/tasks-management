import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginInput } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const loginInput: LoginInput = {
      email: username,
      password,
    };
    const user = await this.authService.validateUser(loginInput);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
