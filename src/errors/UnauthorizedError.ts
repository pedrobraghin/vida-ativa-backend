import { EStatusCode } from "../enums/EStatusCode";
import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(EStatusCode.UNAUTHORIZED, message);
  }
}
