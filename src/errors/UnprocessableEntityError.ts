import { HTTP_STATUS } from "../constants/HttpStatus";
import { BaseError } from "./BaseError";

export class UnprocessableEntityError extends BaseError {
  constructor(message: string = "Entidade não processável") {
    super(HTTP_STATUS.UNPROCESSABLE_ENTITY, message);
  }
}
