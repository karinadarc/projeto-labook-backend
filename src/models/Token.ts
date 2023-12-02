import { USER_ROLES } from "./User";

export interface TokenPayload {
    id: string,
    name: string,
    role: USER_ROLES
}

export type Token = string
