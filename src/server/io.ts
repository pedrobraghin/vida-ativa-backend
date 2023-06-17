import SocketConnection from "../services/SocketConnection";

import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { EventType } from "../@types/EventType";
import { DataPool } from "../services/DataPool";
import { ESocketEvents } from "../enums/ESocketEvents";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { JWTHandler } from "../jwt/JWTHandler";
import { GetUserFriendsService } from "../modules/friends/GetUserFriendsService";
import { OutputUserFriendDTO } from "../@types/FriendshipTypes";

export default class IOHandler {
  private io: Server;
  public connections = new DataPool<SocketConnection>();
  private getUserFriendsService: GetUserFriendsService;

  constructor(
    server: HttpServer,
    getUserFriendsService: GetUserFriendsService
  ) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
      path: "/api/v1/socket.io",
      transports: ["polling", "websocket"],
    });
    this.getUserFriendsService = getUserFriendsService;
    this.configMiddleware();
  }

  public startListen() {
    this.io.on("connection", (socket) => {
      this.connections.add(socket.data.id, new SocketConnection(socket));

      socket.data.userFriends.forEach((friend: OutputUserFriendDTO) => {
        let friendId: string = "";

        if (friend.userOne) {
          friendId = (
            friend.userOne as unknown as OutputUserFriendDTO
          )._id.toString();
        } else {
          friendId = (
            friend.userTwo as unknown as OutputUserFriendDTO
          )._id.toString();
        }

        socket.join(friendId);
        this.io.on(friendId, (data: EventType) => {
          console.log(data);
          socket.emit(ESocketEvents.NOTIFICATION, data);
        });
      });

      socket.on("close", () => {
        this.connections.delete(socket.data.id);
      });

      socket.on(ESocketEvents.NOTIFICATION, (event: EventType) => {
        const destination = this.connections.get(event.payload.to.id);

        if (!destination) return;

        destination.data.sendNotification(event);
      });
    });
  }

  private configMiddleware() {
    this.io.use(this.auth.bind(this));
  }

  private async auth(socket: Socket, next: (err?: Error) => void) {
    try {
      const token = socket.handshake.query.token as string;

      if (!token) {
        return next(
          new UnauthorizedError("You must be logged in to perform this action.")
        );
      }
      const payload = JWTHandler.validateToken(token);
      if (!payload) {
        return next(
          new UnauthorizedError("You must be logged in to perform this action.")
        );
      }
      socket.data.id = payload.id;

      socket.data.userFriends = await this.getUserFriendsService.execute(
        socket.data.id
      );
      return next();
    } catch (err) {
      return next(
        new UnauthorizedError("You must be logged in to perform this action.")
      );
    }
  }

  public close() {
    this.io.disconnectSockets();
    this.io.close();
  }
}
