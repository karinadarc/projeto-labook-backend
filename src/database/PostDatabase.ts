import { PostDbModel, PostWithCreatorDbModel } from "../models/Post";
import { UUID } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public addPost = async (post: PostDbModel): Promise<string> => {
    const [result] = await BaseDatabase.connection
      .insert(post)
      .into(this.TABLE_POSTS)
      .returning("id");

    return result.id as string;
  };

  public getPostById = async (id: UUID): Promise<PostDbModel | undefined> => {
    return await BaseDatabase.connection
      .select()
      .from<PostDbModel>(this.TABLE_POSTS)
      .where({ id })
      .first();
  };

  public getAllPosts = async (): Promise<PostWithCreatorDbModel[]> => {
    const result: PostWithCreatorDbModel[] = await BaseDatabase.connection
      .select(
        `${this.TABLE_POSTS}.id`,
        `${this.TABLE_POSTS}.creator_id`,
        `${this.TABLE_POSTS}.content`,
        `${this.TABLE_POSTS}.likes`,
        `${this.TABLE_POSTS}.dislikes`,
        `${this.TABLE_POSTS}.created_at`,
        `${this.TABLE_POSTS}.updated_at`,
        `${this.TABLE_USERS}.name AS creator_name`
      )
      .from<PostWithCreatorDbModel>(this.TABLE_POSTS)
      .join(
        this.TABLE_USERS,
        `${this.TABLE_POSTS}.creator_id`,
        "=",
        `${this.TABLE_USERS}.id`
      );

    return result;
  };

  public updatePost = async (post: PostDbModel): Promise<void> => {
    await BaseDatabase.connection
      .update(post)
      .into(this.TABLE_POSTS)
      .where("id", post.id);
  };

  public deletePost = async (post: PostDbModel): Promise<void> => {
    await BaseDatabase.connection
      .delete()
      .from(this.TABLE_POSTS)
      .where("id", post.id);
  };
}
