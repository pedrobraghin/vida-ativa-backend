import { IFriendsRepository } from "../../repositories/IFriendsRepository";

export class GetSentRequestsService {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(userId: string) {
    const sentRequests = await this.friendsRepository.getSentRequests(userId);
    return sentRequests;
  }
}
