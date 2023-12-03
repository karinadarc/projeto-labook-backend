import { HTTP_STATUS } from "../constants/HttpStatus";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string = "Não localizado") {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}
