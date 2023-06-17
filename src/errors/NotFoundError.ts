import { EStatusCode } from "../enums/EStatusCode";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(EStatusCode.NOT_FOUND, message);
  }
}
