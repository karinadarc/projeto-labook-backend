import { UUID } from "../types";

export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export interface UserDBModel {
  id: UUID;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
  created_at: string;
}

export interface UserModel {
  id: UUID;
  name: string;
  email: string;
  role: USER_ROLES;
  createdAt: string;
}

export class User {
  constructor(
    private id: UUID,
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLES,
    private createdAt: string
  ) {}

  public getId(): UUID {
    return this.id;
  }

  public setId(value: UUID): void {
    this.id = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string): void {
    this.name = value;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(value: string): void {
    this.email = value;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(value: string): void {
    this.password = value;
  }

  public getRole(): USER_ROLES {
    return this.role;
  }

  public setRole(value: USER_ROLES) {
    this.role = value;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public setCreatedAt(value: string): void {
    this.createdAt = value;
  }

  public toDatabaseModel(): UserDBModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      created_at: this.createdAt,
    };
  }

  public static fromDatabaseModel(model: UserDBModel) {
    return new User(
      model.id,
      model.name,
      model.email,
      model.password,
      model.role,
      model.created_at
    );
  }

  public toBusinessModel(): UserModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
    };
  }
}
