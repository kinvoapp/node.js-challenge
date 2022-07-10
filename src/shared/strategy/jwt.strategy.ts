import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";
import { JwtPayloadDto } from "../auth/dto/jwt-payload.dto";
import * as dotenv from 'dotenv';
import { jwtConstants } from 'src/modules/login/jwt-constants';
dotenv.config();


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
            ignoreExpiration:false,
        });
    }

    async validate(payload: JwtPayloadDto) {
        const user = await this.authService.validateUser(payload);
        if (!user) throw new UnauthorizedException()
        return user
    }
}