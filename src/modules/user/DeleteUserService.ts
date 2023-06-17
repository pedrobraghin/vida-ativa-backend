import { NotFoundError } from "./../../errors/NotFoundError";
import { InvalidParameterError } from "./../../errors/InvalidParameterError";
import { MongoUtils } from "./../../utils/MongoUtils";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import FriendsRepository from "../friends/FriendsRepository";
import { PasswordUtils } from "../../utils/PasswordUtils";
import { UnauthorizedError } from "../../errors/UnauthorizedError";

export class DeleteUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string, password: string) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParameterError("Invalid ID.");
    }
    const user = await this.usersRepository.getUser(id, "password");

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const passUtils = new PasswordUtils();
    const isValidPassword = await passUtils.comparePass(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedError(
        "You are not allowed to perform this action."
      );
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
