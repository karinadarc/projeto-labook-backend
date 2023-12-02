import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/Token";
import { Token } from "../types";

dotenv.config();

export class TokenService {
  public generateToken(payload: TokenPayload): Token {
    return jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
  }

  public decodeToken(token: Token): TokenPayload {
    const payload = jwt.verify(token, process.env.JWT_KEY as string);
    return payload as TokenPayload;
  }
}
