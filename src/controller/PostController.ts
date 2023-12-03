import { NextFunction, Request, Response } from "express";
import { PostBussiness } from "../bussiness/PostBussiness";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { CreatePostSchema } from "../dtos/post/create.dto";
import { UpdatePostSchema } from "../dtos/post/update.dto";
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

  public getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.loggedUser as UserModel;
      const output = await this.postBussiness.getPosts(user);
      return res.status(HTTP_STATUS.OK).send(output);
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updateInput = UpdatePostSchema.parse({
        content: req.body.content,
      });

      const id = req.params.id;

      await this.postBussiness.updatePost(
        id,
        updateInput,
        req.loggedUser as UserModel
      );
      console.info("INFO: post updated: %s", id);
      return res.status(HTTP_STATUS.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;

      await this.postBussiness.deletePost(id, req.loggedUser as UserModel);

      console.info("INFO: post deleted: %s", id);
      return res.status(HTTP_STATUS.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  };
}
