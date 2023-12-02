import { NextFunction, Request, Response } from "express";
import { TokenService } from "../services/TokenService";
import { UnauthorizedError } from "../errors";
import { Token } from "../models/Token";
import { UserDatabase } from "../database/UserDatabase";
import { User, UserModel } from "../models/User";

export class AuthMiddleware {
  constructor(
    private tokenService: TokenService,
    private userDatabase: UserDatabase
  ) {}

  public handle = (req: Request, res: Response, next: NextFunction) => {
    return this.authUser(req, res, next).catch(next);
  };

  private async authUser(req: Request, res: Response, next: NextFunction) {
    const token = this.extractToken(req);
    const payload = this.tokenService.decodeToken(token);
    const user = await this.getUserByToken(payload.id);

    req.loggedUser = user;
    console.error("INFO: Usuário autenticado: %s - %s", user.id, user.name);

    next();
  }

  private extractToken(req: Request): Token {
    const authorization = req.headers.authorization;

    if (!authorization || typeof authorization != "string") {
      throw new UnauthorizedError("Token não enviado.");
    }

    return authorization.replace("Bearer ", "") as Token;
  }

  private async getUserByToken(id: string): Promise<UserModel> {
    const user = await this.userDatabase.getById(id);
    if (user) {
      return User.fromDatabaseModel(user).toBusinessModel();
    }

    throw new UnauthorizedError("Usuário inexistente");
  }
}
