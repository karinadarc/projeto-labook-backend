import { PostDatabase } from "../database/PostDatabase";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/post/create.dto";
import { GetPostsOutputDTO } from "../dtos/post/get.dto";
import { LikeDeslikePostInputDTO } from "../dtos/post/like.dto";
import { UpdatePostInputDTO } from "../dtos/post/update.dto";
import { ForbidenError, NotFoundError } from "../errors";
import { LikeDeslike } from "../models/LikeDeslike";
import { Post } from "../models/Post";
import { USER_ROLES, UserModel } from "../models/User";
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
      throw new ForbidenError("Somente o autor pode editar o post");
    }

    post.setContent(input.content);
    post.setUpdatedAt(new Date().toISOString());

    await this.postDatabase.updatePost(post.toDatabaseModel());
  };

  public deletePost = async (id: UUID, user: UserModel): Promise<void> => {
    const result = await this.postDatabase.getPostById(id);

    if (!result) {
      throw new NotFoundError("Post não encontrado.");
    }

    const post = Post.fromDatabaseModel(result);

    if (post.getCreatorId() !== user.id && user.role !== USER_ROLES.ADMIN) {
      throw new ForbidenError("Sem permissoes para remover o post");
    }

    await this.postDatabase.deletePost(post.toDatabaseModel());
  };

  public async likeDeslike(
    id: UUID,
    input: LikeDeslikePostInputDTO,
    user: UserModel
  ): Promise<void> {
    const databasePost = await this.postDatabase.getPostById(id);
    if (!databasePost) {
      throw new NotFoundError("Post não encontrado.");
    }

    const post = Post.fromDatabaseModel(databasePost);

    //author não pode dar like
    if (post.getCreatorId() == user.id) {
      throw new ForbidenError("O autor não pode curtir o post");
    }

    const oldLikeDislike = await this.postDatabase.getPostlikeDeslikeByUser(
      post.getId(),
      user.id
    );

    const newLikeDislike = new LikeDeslike(user.id, post.getId(), input.like);

    if (!oldLikeDislike) {
      newLikeDislike.getLike() ? post.increaseLikes() : post.increaseDislikes();
      await this.postDatabase.updatePostandAddLikeDislike(
        post.toDatabaseModel(),
        newLikeDislike.toDatabaseModel()
      );
      return;
    }

    if (oldLikeDislike.like === newLikeDislike.toDatabaseModel().like) {
      newLikeDislike.getLike() ? post.decreaseLikes() : post.decreaseDislikes();
      await this.postDatabase.updatePostAndRemoveLikeDislike(
        post.toDatabaseModel(),
        oldLikeDislike
      );
      return;
    }

    if (newLikeDislike.getLike()) {
      post.decreaseDislikes();
      post.increaseLikes();
    } else {
      post.increaseDislikes();
      post.decreaseLikes();
    }

    await this.postDatabase.updatePostAndReplaceLikeDislike(
      post.toDatabaseModel(),
      newLikeDislike.toDatabaseModel(),
      oldLikeDislike
    );
  }
}
