import { RolesType } from "src/shared/types/roles.type";

export class JwtPayloadDto {
    accountId: string;
    roles: RolesType[]
}