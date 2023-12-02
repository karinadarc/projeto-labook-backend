export interface PostDbModel {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export class Post {
  constructor(
    private id: string,
    private creatorId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string
  ) {}

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
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

  getDislikes(): number {
    return this.dislikes;
  }

  setDislikes(dislikes: number): void {
    this.dislikes = dislikes;
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
}
