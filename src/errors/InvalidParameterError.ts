import { EStatusCode } from "../enums/EStatusCode";
import { BaseError } from "./BaseError";

export class InvalidParameterError extends BaseError {
  constructor(message: string) {
    super(EStatusCode.BAD_REQUEST, message);
  }
}
