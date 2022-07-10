import { Injectable } from "@nestjs/common";
import { IContract } from "src/shared/contracts/contract.interface";
import { ContractValidator } from "src/shared/utils/contract-validator";
import { CreateRevenueDto } from "../dto/create-revenue.dto";

@Injectable()
export class CreateRevenueContract implements IContract {
    errors: any;
    validate(user: CreateRevenueDto): boolean {
        const flunt = new ContractValidator();
        flunt.isRequiredString(user.title, 'Title is required!')
        flunt.isRequiredString(user.description, 'Description is required!')
        flunt.isRequiredNumber(user.value, 'Value is required!')
        this.errors = flunt.errors;
        return flunt.valid();
    }
}