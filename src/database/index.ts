import mongoose from "mongoose";

export default class Database {
  private DB_URL = String(process.env.DB_URL);
  private DB_PASS = String(process.env.DB_PASS);

  constructor() {
    this.DB_URL = this.DB_URL.replace("<PASS>", this.DB_PASS);
    mongoose.set("strictQuery", true);
    mongoose.createConnection(this.DB_URL);
  }

  public async connect() {
    return await mongoose.connect(this.DB_URL);
  }

  public async disconnect() {
    await mongoose.disconnect();
  }
}
