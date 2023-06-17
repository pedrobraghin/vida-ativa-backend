import { InputUserDTO } from "../../@types/UserTypes";
import { BadRequestError } from "../../errors/BadRequestError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string, input: Partial<InputUserDTO>) {
    const fields = Object.keys(input).join(" ");

    if (input.password) {
      throw new BadRequestError(
        'Password update is not allowed in this route. Please use "/users/update-password" instead.'
      );
    }

    const updatedUser = await this.usersRepository.updateUser(
      userId,
      input,
      fields
    );

    return updatedUser;
  }
}
