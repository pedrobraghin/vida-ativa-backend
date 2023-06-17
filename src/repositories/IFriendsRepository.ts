import {
  InputFriendRequestDTO,
  OutputFriendRequestDTO,
  InputUserFriendDTO,
  OutputUserFriendDTO,
} from "../@types/FriendshipTypes";

export interface IFriendsRepository {
  sendFriendRequest(
    input: InputFriendRequestDTO
  ): Promise<OutputFriendRequestDTO | null>;
  acceptFriendRequest(
    id: string,
    userId: string
  ): Promise<OutputFriendRequestDTO | null>;
  declineFriendRequest(
    id: string,
    userId: string
  ): Promise<OutputFriendRequestDTO | null>;
  deleteFriendRequest(
    id: string,
    userId: string
  ): Promise<OutputFriendRequestDTO | null>;
  getFriendRequest(
    senderId: string,
    recipientId: string
  ): Promise<OutputFriendRequestDTO | null>;
  getFriendRequests(
    input: Partial<InputFriendRequestDTO>
  ): Promise<OutputFriendRequestDTO[]>;
  deleteUserFriendRequests(userId: string): Promise<void>;
  getUserFriends(userId: string): Promise<OutputUserFriendDTO[]>;
  getSentRequests(userId: string): Promise<OutputFriendRequestDTO[]>;
  deleteUserFriendships(userId: string): Promise<void>;
  createFriendship(input: InputUserFriendDTO): Promise<OutputUserFriendDTO>;
  deleteFriendship(
    id: string,
    userId: string
  ): Promise<OutputUserFriendDTO | null>;
}
