import z from "zod";
import { Token } from "../../types";

export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface LoginOutputDTO {
  token: Token;
}

export const LoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .transform((data) => data as LoginInputDTO);
