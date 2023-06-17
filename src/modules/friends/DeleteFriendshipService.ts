import { MongoUtils } from "../../utils/MongoUtils";
import { NotFoundError } from "../../errors/NotFoundError";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IFriendsRepository } from "../../repositories/IFriendsRepository";

export class DeleteFriendshipService {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(id: string, userId: string) {
    const isValidFriendshipId = MongoUtils.isValidId(id);
    const isValidUserId = MongoUtils.isValidId(userId);

    if (!isValidFriendshipId || !isValidUserId) {
      throw new InvalidParameterError("Invalid user or friendship ID.");
    }

    const deletedFriendship = await this.friendsRepository.deleteFriendship(
      id,
      userId
    );
    if (!deletedFriendship) {
      throw new NotFoundError("Friendship not found.");
    }

    return deletedFriendship;
  }
}
