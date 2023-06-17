import { IFriendsRepository } from "../../repositories/IFriendsRepository";

export class GetUserFriendsService {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(userId: string) {
    const friends = await this.friendsRepository.getUserFriends(userId);
    return friends;
  }
}
