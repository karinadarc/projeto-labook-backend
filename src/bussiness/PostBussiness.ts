import { PostDatabase } from "../database/PostDatabase";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/post/create.dto";
import { GetPostsOutputDTO } from "../dtos/post/get.dto";
import { UpdatePostInputDTO } from "../dtos/post/update.dto";
import { ForbidenError, NotFoundError } from "../errors";
import { Post } from "../models/Post";
import { UserModel } from "../models/User";
import { IdService } from "../services/IdService";
import { UUID } from "../types";

export class PostBussiness {
  constructor(
    private postDatabase: PostDatabase,
    private idService: IdService
  ) {}

  public createPost = async (
    input: CreatePostInputDTO,
    user: UserModel
  ): Promise<CreatePostOutputDTO> => {
    const now = new Date().toISOString();
    const post = new Post(
      this.idService.newId(),
      user.id,
      input.content,
      0,
      0,
      now,
      now
    );

    const id = await this.postDatabase.addPost(post.toDatabaseModel());
    return { id };
  };

  public getPosts = async (user: UserModel): Promise<GetPostsOutputDTO> => {
    const result = await this.postDatabase.getAllPosts();

    return result.map((post) => Post.fromDatabaseModel(post).toBusinessModel());
  };

  public updatePost = async (
    id: UUID,
    input: UpdatePostInputDTO,
    user: UserModel
  ): Promise<void> => {
    const result = await this.postDatabase.getPostById(id);

    if (!result) {
      throw new NotFoundError("Post não encontrado.");
    }

    const post = Post.fromDatabaseModel(result);

    if (post.getCreatorId() !== user.id) {
      throw new ForbidenError("Somente o autor pode editar o post.");
    }

    post.setContent(input.content);
    post.setUpdatedAt(new Date().toISOString());

    await this.postDatabase.updatePost(post.toDatabaseModel());
  };
}
