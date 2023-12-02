import { HTTP_STATUS } from "../constants/HttpStatus";
import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
  constructor(message: string = "Não autorizado") {
    super(HTTP_STATUS.UNAUTHORIZED, message);
  }
}
