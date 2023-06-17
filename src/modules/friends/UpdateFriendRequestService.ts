import main from "../..";

import { MongoUtils } from "../../utils/MongoUtils";
import { OutputUserDTO } from "../../@types/UserTypes";
import { NotFoundError } from "../../errors/NotFoundError";
import { FriendshipRequestStatus } from "../../@types/FriendshipTypes";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IFriendsRepository } from "../../repositories/IFriendsRepository";

export class UpdateFriendRequestService {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(
    id: string,
    user: OutputUserDTO,
    status: FriendshipRequestStatus
  ) {
    const isValidId = MongoUtils.isValidId(id);
    if (!isValidId) {
      throw new InvalidParameterError("Invalid ID.");
    }

    if (status === FriendshipRequestStatus.ACCEPTED) {
      const request = await this.friendsRepository.acceptFriendRequest(
        id,
        user._id
      );
      if (!request) {
        throw new NotFoundError("Friend request not found.");
      }

      await this.friendsRepository.createFriendship({
        userOne: request.sender.toString(),
        userTwo: request.recipientId.toString(),
      });

      const sender = main.io.connections.get(request.sender.toString());

      if (sender) {
        sender.data.acceptFriendRequestNotification(user);
      }
    } else {
      const request = await this.friendsRepository.declineFriendRequest(
        id,
        user._id
      );
      if (!request) {
        throw new NotFoundError("Friend request not found.");
      }
    }
  }
}
