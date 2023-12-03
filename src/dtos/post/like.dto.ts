import { z } from "zod";

export interface LikeDeslikePostInputDTO {
  like: boolean;
}

export const LikeDeslikePostSchema = z
  .object({
    like: z.boolean(),
  })
  .transform((data) => data as LikeDeslikePostInputDTO);
