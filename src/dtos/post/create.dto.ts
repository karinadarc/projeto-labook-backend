import z from "zod";

export interface CreatePostInputDTO {
  content: string;
}

export interface CreatePostOutputDTO {
  id: string;
}

export const CreatePostSchema = z
  .object({
    content: z.string().min(8),
  })
  .transform((data) => data as CreatePostInputDTO);
