import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { BaseError } from "../errors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR: %s - %s", error.name, error.message);
  if (error instanceof ZodError) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: "Requisição inválida", errors: error.issues });
  }

  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: error.message });
  }

  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ error: "Erro inesperado" });
};
