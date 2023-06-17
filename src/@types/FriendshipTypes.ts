import { OutputUserDTO } from "./UserTypes";

export enum FriendshipRequestStatus {
  PENDING,
  ACCEPTED,
  DENIED,
}

export interface InputFriendRequestDTO {
  sender: String;
  receiver: String;
  recipientId: String;
  user: OutputUserDTO;
}

export interface OutputFriendRequestDTO extends InputFriendRequestDTO {
  _id: String;
  status: FriendshipRequestStatus;
}

export interface InputUserFriendDTO {
  userOne: String;
  userTwo: String;
}

export interface OutputUserFriendDTO extends InputUserFriendDTO {
  _id: String;
  createdAt: String;
  updatedAt: String;
}
