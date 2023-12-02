import { UUID } from "../types";
import { USER_ROLES } from "./User";

export interface TokenPayload {
  id: UUID;
  name: string;
  role: USER_ROLES;
}
