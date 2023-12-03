import dotenv from "dotenv";
import { knex } from "knex";

dotenv.config();

export abstract class BaseDatabase {
  readonly TABLE_USERS = "users";
  readonly TABLE_POSTS = "posts";
  readonly TABLE_LIKES_DISLIKES = "likes_dislikes";

  protected static connection = knex({
    client: "sqlite3",
    connection: {
      filename: process.env.DB_FILE_PATH as string,
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
      afterCreate: (conn: any, cb: any) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  });
}
