import { MongoUtils } from "../../utils/MongoUtils";
import { NotFoundError } from "../../errors/NotFoundError";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IFriendsRepository } from "../../repositories/IFriendsRepository";

export class DeleteFriendRequestService {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(id: string, userId: string) {
    const isValidFriendRequestId = MongoUtils.isValidId(id);

    if (!isValidFriendRequestId) {
      throw new InvalidParameterError("Invalid friend request ID.");
    }

    const request = await this.friendsRepository.deleteFriendRequest(
      id,
      userId
    );

    if (!request) {
      throw new NotFoundError("Friend request not found.");
    }

    return request;
  }
}
