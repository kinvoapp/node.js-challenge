import { User } from "src/modules/user/entities/user.entity";
import { RolesType } from "../types/roles.type";

export class Utils {

    static getUserWithAccountId(accountId: string): User {
        let user = new User();
        user.id = accountId;
        return user;
    }

    static isAdmin(role: RolesType): boolean {
        return role.includes(RolesType.ADMIN)
    }
}