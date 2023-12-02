import { UserDBModel } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  readonly TABLE_USERS = "users";

  public addUser = async (user: UserDBModel): Promise<void> => {
    await BaseDatabase.connection.insert(user).into(this.TABLE_USERS);
  };

  public getByEmail = async (
    email: string
  ): Promise<UserDBModel | undefined> => {
    return await BaseDatabase.connection
      .select()
      .from<UserDBModel>(this.TABLE_USERS)
      .where({ email })
      .first();
  };
}
