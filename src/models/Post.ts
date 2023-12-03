import { UUID } from "../types";

export interface PostDbModel {
  id: UUID;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export interface PostWithCreatorDbModel extends PostDbModel {
  creator_name: string;
}

export interface PostModel {
  id: UUID;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creator: {
    creatorId: string;
    creatorName?: string;
  };
}

export class Post {
  constructor(
    private id: UUID,
    private creatorId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorName?: string | undefined
  ) {}

  getId(): UUID {
    return this.id;
  }

  setId(id: UUID): void {
    this.id = id;
  }

  getCreatorId(): string {
    return this.creatorId;
  }

  setCreatorId(creatorId: string): void {
    this.creatorId = creatorId;
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.content = content;
  }

  getLikes(): number {
    return this.likes;
  }

  setLikes(likes: number): void {
    this.likes = likes;
  }

  increaseLikes(): void {
    this.setLikes(this.getLikes() + 1);
  }

  decreaseLikes(): void {
    if (this.getLikes() <= 0) {
      throw new Error("Não é possível ter likes negativos");
    }
    this.setLikes(this.getLikes() - 1);
  }

  getDislikes(): number {
    return this.dislikes;
  }

  setDislikes(dislikes: number): void {
    this.dislikes = dislikes;
  }

  increaseDislikes(): void {
    this.setDislikes(this.getDislikes() + 1);
  }

  decreaseDislikes(): void {
    if (this.getDislikes() <= 0) {
      throw new Error("Não é possível ter Dislikes negativos");
    }
    this.setDislikes(this.getDislikes() - 1);
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  setCreatedAt(createdAt: string): void {
    this.createdAt = createdAt;
  }

  getUpdatedAt(): string {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: string): void {
    this.updatedAt = updatedAt;
  }

  public getCreatorName(): string | undefined {
    return this.creatorName;
  }

  public setCreatorName(name: string): void {
    this.creatorName = name;
  }

  toDatabaseModel(): PostDbModel {
    return {
      id: this.id,
      creator_id: this.creatorId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  public static fromDatabaseModel(
    model: PostDbModel | PostWithCreatorDbModel
  ): Post {
    const post = new Post(
      model.id,
      model.creator_id,
      model.content,
      model.likes,
      model.dislikes,
      model.created_at,
      model.updated_at
    );

    if ("creator_name" in model) {
      post.setCreatorName(model.creator_name);
    }

    return post;
  }

  public toBusinessModel(): PostModel {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      creator: {
        creatorId: this.creatorId,
        creatorName: this.creatorName,
      },
    };
  }
}
