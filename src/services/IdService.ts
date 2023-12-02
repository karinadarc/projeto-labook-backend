import { v4 } from "uuid";
import { UUID } from "../types";

export class IdService {
  public newId = (): UUID => v4();
}
