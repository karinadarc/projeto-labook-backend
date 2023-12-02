import { NextFunction, Request, Response } from "express";
import { PostBussiness } from "../bussiness/PostBussiness";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { CreatePostSchema } from "../dtos/post/create.dto";
import { UserModel } from "../models/User";

export class PostController {
  constructor(private postBussiness: PostBussiness) {}

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createInput = CreatePostSchema.parse({
        content: req.body.content,
      });

      const output = await this.postBussiness.createPost(
        createInput,
        req.loggedUser as UserModel
      );
      console.info("INFO: post created: %s", output.id);
      return res.status(HTTP_STATUS.CREATED).send(output);
    } catch (error) {
      next(error);
    }
  };
}
