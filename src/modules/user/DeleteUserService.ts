import { NotFoundError } from "./../../errors/NotFoundError";
import { InvalidParameterError } from "./../../errors/InvalidParameterError";
import { MongoUtils } from "./../../utils/MongoUtils";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import FriendsRepository from "../friends/FriendsRepository";

export class DeleteUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParameterError("Invalid ID.");
    }

    const deletedUser = await this.usersRepository.deleteUser(id);

    if (!deletedUser) {
      throw new NotFoundError("User not found.");
    }

    await Promise.all([
      FriendsRepository.deleteUserFriendships(id),
      FriendsRepository.deleteUserFriendRequests(id),
    ]);

    return deletedUser;
  }
}
