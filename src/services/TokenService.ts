import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Token, TokenPayload } from "../models/Token";

dotenv.config();

export class TokenService {
  public generateToken(payload: TokenPayload): Token {
    return jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
  }
}