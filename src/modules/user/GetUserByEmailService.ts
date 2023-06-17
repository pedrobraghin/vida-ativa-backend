import { InputUserDTO, OutputUserDTO } from "../../@types/UserTypes";
import { NotFoundError } from "../../errors/NotFoundError";
import FriendsRepository from "../friends/FriendsRepository";
import { GetFriendRequestService } from "../friends/GetFriendRequestService";
import { IUsersRepository } from "./../../repositories/IUsersRepository";

export class GetUserByEmailService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(input: Partial<InputUserDTO>, loggedUser: OutputUserDTO) {
    const user = await this.usersRepository.getUserByEmail(
      input,
      "name email img fullName"
    );

    if (!user) {
      throw new NotFoundError("User not found.");
    }
    const getFriendRequest = new GetFriendRequestService(FriendsRepository);

    const status = await getFriendRequest.execute(
      loggedUser._id,
      user._id,
      true
    );

    return { user, status: status?.status };
  }
}
