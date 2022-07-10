import { Injectable } from "@nestjs/common";
import { IContract } from "src/shared/contracts/contract.interface";
import { ContractValidator } from "src/shared/utils/contract-validator";
import { AuthenticateDto } from "../dto/authenticate.dto";

@Injectable()
export class LoginContract implements IContract {
    errors: any;
    validate(user: AuthenticateDto): boolean {
        const flunt = new ContractValidator();
        flunt.isRequiredString(user.email, 'Email is required!')
        flunt.isRequiredString(user.password, 'Password is required!')
        this.errors = flunt.errors;
        return flunt.valid();
    }
}