import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { BaseError } from "../errors";
import { ZodError } from "zod";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error.message);
  if (error instanceof ZodError) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ error: "Requisição inválida", errors: error.issues });
    next(error);
  }

  if (error instanceof BaseError) {
    return res.status(error.statusCode).send({ error: error.message });
  }

  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .send({ error: "Erro inesperado" });
};
