import { NextFunction, Request, Response } from "express";
import { PostBussiness } from "../bussiness/PostBussiness";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { CreatePostSchema } from "../dtos/post/create.dto";
import { LikeDeslikePostSchema } from "../dtos/post/like.dto";
import { UpdatePostSchema } from "../dtos/post/update.dto";
import { UUIDSchema } from "../dtos/post/uuid.dto";
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
      console.info("INFO: post criado: %s", output.id);
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
      console.info("INFO: post removido: %s", id);
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

  public like = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = UUIDSchema.parse(req.params.id);
      const likeInput = LikeDeslikePostSchema.parse({
        like: req.body.like,
      });
      await this.postBussiness.likeDeslike(
        id,
        likeInput,
        req.loggedUser as UserModel
      );

      console.info("INFO: Post %s atualizado", id);
      res.status(HTTP_STATUS.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  };
}
