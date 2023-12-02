import { UserModel } from "../../models/User";

declare global {
  namespace Express {
    interface Request {
      loggedUser?: UserModel | undefined;
    }
  }
}
