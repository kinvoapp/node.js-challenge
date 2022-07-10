import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/modules/login/jwt-constants";
import { UserService } from "src/modules/user/user.service";
import { RolesType } from "../types/roles.type";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
var jwt_decode = require('jwt-decode');

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async createToken(accountId, roles: RolesType[]) {
        const user: JwtPayloadDto = {
            accountId: accountId,
            roles: roles
        };
        return this.jwtService.sign(user, { secret: jwtConstants.secret });
    }

    async validateUser(payload: JwtPayloadDto): Promise<any> {
        return payload;
    }

    static decode(token: String) {
        let tokenDecode = jwt_decode(token);
        return {
            accountId: tokenDecode["accountId"],
            roles: tokenDecode["roles"] || []
        };
    }

}