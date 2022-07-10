import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, UnauthorizedException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import { RolesType } from '../types/roles.type';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
    constructor(public roles: RolesType[]) {
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const payload: JwtPayloadDto = context.switchToHttp().getRequest().user;
        console.log(payload);

        let hasRole = false;
        payload.roles.forEach(role => {
            if (this.roles.includes(role))
                hasRole = true;
        });

        if (!hasRole) {
            throw new UnauthorizedException()
            // throw new HttpException(
            //     new ResultDto('Acesso não autorizado', false, null, null),
            //     HttpStatus.UNAUTHORIZED);
        }

        return next.handle();
    }
}