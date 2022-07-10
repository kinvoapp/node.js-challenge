import { Injectable } from "@nestjs/common";
import { IContract } from "src/shared/contracts/contract.interface";
import { ContractValidator } from "src/shared/utils/contract-validator";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class CreateUserContract implements IContract {
    errors: any;
    validate(user: CreateUserDto): boolean {
        const flunt = new ContractValidator();
        flunt.isRequiredString(user.name, 'Name is required!')
        flunt.isRequiredString(user.email, 'Email is required!')
        flunt.isRequiredString(user.password, 'Password is required!')
        flunt.isRequiredString(user.roles, 'Role is required!')

        this.errors = flunt.errors;
        return flunt.valid();
    }
}