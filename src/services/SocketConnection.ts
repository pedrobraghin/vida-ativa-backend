import { Socket } from "socket.io";
import { EventType } from "../@types/EventType";
import { ESocketEvents } from "../enums/ESocketEvents";
import { OutputUserDTO } from "../@types/UserTypes";
import { v4 as uuidv4 } from "uuid";
import { OutputFriendRequestDTO } from "../@types/FriendshipTypes";

export default class SocketConnection {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public async sendNotification(data: EventType) {
    this.socket.emit(ESocketEvents.NOTIFICATION, data);
  }

  public async acceptFriendRequestNotification(sender: OutputUserDTO) {
    this.socket.emit(ESocketEvents.FRIEND_REQUEST, {
      id: uuidv4(),
      type: ESocketEvents.ACCEPTED_FRIEND_REQUEST,
      payload: {
        body: `<strong>${sender.fullName}</strong> aceitou sua solicitação de amizade.`,
        title: `Notificação de <strong>${sender.fullName}</strong>`,
        from: {
          id: sender._id.toString(),
          fullName: sender.fullName,
          img: sender.img?.regular,
        },
      },
    } as EventType);
  }

  public async sendFriendRequestNotification(
    sender: OutputUserDTO,
    request: OutputFriendRequestDTO
  ) {
    this.socket.emit(ESocketEvents.FRIEND_REQUEST, {
      id: uuidv4(),
      type: ESocketEvents.FRIEND_REQUEST,
      payload: {
        body: `<strong>${sender.fullName}</strong> te enviou uma solicitação de amizade.`,
        title: "<strong>Você recebeu uma solicitação de amizade!</strong>",
        from: {
          id: sender._id.toString(),
          fullName: sender.fullName,
          img: sender.img?.regular,
        },
        data: {
          requestId: request._id.toString(),
        },
      },
    } as EventType);
  }
}
