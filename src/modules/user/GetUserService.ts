import { AccountTypes } from "../../@types/UserTypes";
import { NotFoundError } from "../../errors/NotFoundError";
import { IUsersRepository } from "./../../repositories/IUsersRepository";

export class GetUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string, userAccountType: AccountTypes) {
    const user = await this.usersRepository.getUser(
      id,
      "name email img fullName address phoneNumber"
    );

    if (!user || user.accountType === userAccountType) {
      throw new NotFoundError("User not found.");
    }

    return user;
  }
}
