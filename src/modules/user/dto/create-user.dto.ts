import { RolesType } from "src/shared/types/roles.type";

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    roles: string
}
