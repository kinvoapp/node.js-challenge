import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { IContract } from "../contracts/contract.interface";
import { Result } from "../utils/result";



@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: IContract) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException(
                new Result(false, null, this.contract.errors),
                HttpStatus.BAD_REQUEST
            );
        }

        return next.handle();
    }
}