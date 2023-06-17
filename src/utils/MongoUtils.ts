import mongoose from "mongoose";

export class MongoUtils {
  public static isValidId(id: string) {
    return mongoose.isObjectIdOrHexString(id);
  }
}
