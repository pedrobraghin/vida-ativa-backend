import { EStatusCode } from "../enums/EStatusCode";
import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(EStatusCode.BAD_REQUEST, message);
  }
}
