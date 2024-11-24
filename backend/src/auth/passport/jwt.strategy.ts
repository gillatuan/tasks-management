import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload) {
        const { _id, name, email, role } = payload;
        // cần gán thêm permissions vào req.user
        const userRole = role as unknown as { _id: string; name: string }
        // const temp = (await this.rolesService.findOne(userRole._id)).toObject();

        //req.user
        return {
            _id,
            name,
            email,
            role,
            // permissions: temp?.permissions ?? []
        };
    }

}