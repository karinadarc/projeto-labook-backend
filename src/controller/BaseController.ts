import { Response } from "express";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { BaseError } from "../errors/BaseError";

export abstract class BaseController {
  protected responseError = async (error: Error, res: Response) => {
    console.error(error);
    if (error instanceof ZodError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).send(error.issues);
    }

    if (error instanceof BaseError) {
      return res.status(error.statusCode).send(error.message);
    }

    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send({ error: "Erro inesperado" });
  };
}
