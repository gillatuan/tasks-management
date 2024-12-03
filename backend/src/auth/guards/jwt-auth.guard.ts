import { IS_PUBLIC_KEY } from '@/helpers/setPubicPage';
import { UsersService } from '@/modules/users/users.service';
import {
  BadRequestException,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    if (!ctx.getContext().req.headers.authorization) {
      throw new UnauthorizedException();
    }
    
    const token = this.extractToken(ctx.getContext().req);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_TOKEN_KEY,
      });
      const user = await this.userService.findOne(payload.id);
      ctx.getContext().req.user_data = user;

      return true;
    } catch (error) {
      console.log('err=> ', error);
      throw new BadRequestException('Invalid token!');
    }
  }

  private extractToken(req: any): string | undefined {
    const [type, token] = req.headers.authorization
      ? req.headers.authorization.split(' ')
      : [];

    return type === 'Bearer' ? token : undefined;
  }
}
