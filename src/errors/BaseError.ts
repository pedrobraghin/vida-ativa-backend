import { EStatusCode } from "./../enums/EStatusCode";

export class BaseError extends Error {
  public readonly isOperational = true;
  public readonly status: EStatusCode;

  constructor(status: EStatusCode, message: string) {
    super(message);
    this.status = status;
  }
}
