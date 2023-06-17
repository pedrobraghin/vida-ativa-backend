import main from "../..";

import { NotFoundError } from "../../errors/NotFoundError";
import { InputFriendRequestDTO } from "../../@types/FriendshipTypes";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IFriendsRepository } from "../../repositories/IFriendsRepository";

export class SendFriendRequestService {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(input: InputFriendRequestDTO) {
    if (input.sender === input.recipientId) {
      throw new InvalidParameterError(
        "You cannot send a friend request to yourself"
      );
    }

    input.receiver = input.recipientId;
    const friendRequest = await this.friendsRepository.sendFriendRequest(input);

    if (!friendRequest) {
      throw new NotFoundError("User not found.");
    }
    const recipient = main.io.connections.get(input.recipientId.toString());

    if (recipient) {
      recipient.data.sendFriendRequestNotification(input.user, friendRequest);
    }

    return friendRequest;
  }
}
