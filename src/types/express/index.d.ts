import { UserModel } from "../../models/User";

export {};

declare global {
  namespace Express {
    interface Request {
      loggedUser?: UserModel | undefined;
    }
  }
}
