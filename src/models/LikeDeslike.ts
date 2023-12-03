import { UUID } from "../types";

export interface LikeDeslikeDbModel {
  user_id: string;
  post_id: string;
  like: number;
}

export class LikeDeslike {
  constructor(
    private readonly userId: UUID,
    private readonly postId: UUID,
    private readonly like: boolean
  ) {}

  getUserId(): UUID {
    return this.userId;
  }

  getPostId(): UUID {
    return this.postId;
  }

  getLike(): boolean {
    return this.like;
  }

  toDatabaseModel(): LikeDeslikeDbModel {
    return {
      user_id: this.userId,
      post_id: this.postId,
      like: this.like ? 1 : 0,
    };
  }

  static fromDatabaseModel(data: LikeDeslikeDbModel): LikeDeslike {
    return new LikeDeslike(
      data.user_id,
      data.post_id,
      data.like === 1 ? true : false
    );
  }
}
