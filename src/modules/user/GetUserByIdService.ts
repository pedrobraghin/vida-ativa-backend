import { InvalidParameterError } from "./../../errors/InvalidParameterError";
import { MongoUtils } from "./../../utils/MongoUtils";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { NotFoundError } from "../../errors/NotFoundError";

export class GetUserByIdService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    const isValidMongoId = MongoUtils.isValidId(id);

    if (!isValidMongoId) {
      throw new InvalidParameterError("Invalid id.");
    }

    const user = this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}
