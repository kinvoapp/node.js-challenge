import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const TokenJwt = createParamDecorator((data: unknown, context: ExecutionContext) => {
    try {
        const headers = context.switchToHttp().getRequest().headers;
        const token = String(headers["authorization"] || headers["Authorization"]).split(" ")[1];
        return token;
    } catch (error) {
        return "";
    }
});
