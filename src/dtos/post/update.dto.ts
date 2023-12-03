import z from "zod";

export interface UpdatePostInputDTO {
  content: string;
}

export const UpdatePostSchema = z
  .object({
    content: z.string().min(8),
  })
  .transform((data) => data as UpdatePostInputDTO);
