import { InputFriendRequestDTO } from "../../@types/FriendshipTypes";
import { IFriendsRepository } from "../../repositories/IFriendsRepository";

export class GetFriendRequestsService {
  constructor(private friendRepository: IFriendsRepository) {}

  async execute(input: Partial<InputFriendRequestDTO>) {
    const requests = await this.friendRepository.getFriendRequests(input);
    return requests;
  }
}
