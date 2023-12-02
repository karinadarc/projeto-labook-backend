import { HTTP_STATUS } from "../constants/HttpStatus";
import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message: string = "Requisição inválida") {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}
