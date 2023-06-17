import "dotenv/config";
import http from "http";
import app from "./server/app";
import Database from "./database";
import Server from "./server/Server";
import IOHandler from "./server/io";
import FriendsRepository from "./modules/friends/FriendsRepository";
import { GetUserFriendsService } from "./modules/friends/GetUserFriendsService";

class Main {
  private port = Number(process.env.PORT);
  private server: Server;
  private database: Database;
  public io: IOHandler;

  constructor() {
    const httpServer = http.createServer(app);

    this.server = new Server(httpServer, this.port);
    this.database = new Database();
    this.io = new IOHandler(
      httpServer,
      new GetUserFriendsService(FriendsRepository)
    );

    process.on("SIGALRM", () => {
      this.shutdown();
    });
  }

  private shutdown() {
    this.server.stop();
    this.database.disconnect();
    this.io.close();
  }

  private async init() {
    await this.server.start(async () => {
      console.log("Server is running on port " + this.port);
      await this.database.connect();
      console.log("Database connected");
      this.io.startListen();
      console.log("Socket started");
    });
  }

  public start() {
    try {
      this.init();
    } catch (err) {
      this.shutdown();
    }
  }
}

const main = new Main();
main.start();

export default main;
