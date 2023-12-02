import { v4 } from "uuid";
import { Token } from "../models/Token";

export class IdService {
  public newId = (): Token => v4();
}
