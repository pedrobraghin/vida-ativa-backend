import { PasswordUtils } from "./../../utils/PasswordUtils";
import { InputUserDTO } from "./../../@types/UserTypes";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(input: InputUserDTO) {
    const passwordUtils = new PasswordUtils();

    const parsedData = Object.assign({}, input);
    parsedData.password = await passwordUtils.hashPass(input.password);
    const user = await this.usersRepository.createUser(parsedData);

    return user;
  }
}
