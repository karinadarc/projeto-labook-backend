import z from "zod";
import { Token } from "../../models/Token";

export interface SignupInputDTO {
  name: string;
  email: string;
  password: string;
}

export interface SignupOutputDTO {
  token: Token;
}

export const SignupSchema = z
  .object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .transform((data) => data as SignupInputDTO);
