import { PostDbModel } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  readonly TABLE_POSTS = "posts";
  readonly TABLE_LIKES_DISLIKES = "likes_dislikes";

  public addPost = async (post: PostDbModel): Promise<string> => {
    const [result] = await BaseDatabase.connection
      .insert(post)
      .into(this.TABLE_POSTS)
      .returning("id");

    return result.id as string;
  };
}
