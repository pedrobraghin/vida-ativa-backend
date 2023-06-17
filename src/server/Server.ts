import { Server as HttpServer } from "http";

export default class Server {
  private server: HttpServer;
  private port: number;

  public constructor(server: HttpServer, port: number) {
    this.server = server;
    this.port = port;
  }

  async start(cb?: () => Promise<void>) {
    this.server = this.server.listen(this.port, cb);
  }

  async stop(cb?: () => Promise<void>) {
    if (!this.server) return;
    this.server.close(cb);
  }
}
