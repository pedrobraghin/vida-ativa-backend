import { NotFoundError } from "../../errors/NotFoundError";
import { IFriendsRepository } from "../../repositories/IFriendsRepository";

export class GetFriendRequestService {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(senderId: string, recipientId: string, safe: boolean = false) {
    const request = await this.friendsRepository.getFriendRequest(
      senderId,
      recipientId
    );

    if (!request) {
      if (safe) {
        return null;
      }
      throw new NotFoundError("Friend request not found.");
    }

    return request;
  }
}
