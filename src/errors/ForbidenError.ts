import { HTTP_STATUS } from "../constants/HttpStatus";
import { BaseError } from "./BaseError";

export class ForbidenError extends BaseError {
  constructor(message: string = "Acesso Negado") {
    super(HTTP_STATUS.FORBIDDEN, message);
  }
}
