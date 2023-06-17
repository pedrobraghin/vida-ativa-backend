import { PasswordUtils } from "./../../utils/PasswordUtils";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { JWTHandler } from "../../jwt/JWTHandler";

export class SignInUserService {
  constructor(private usersRepository: IUsersRepository) {}
  async execute(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(
      { email },
      "password _id"
    );
    if (!user) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    const passwordUtils = new PasswordUtils();

    const isValidPassword = await passwordUtils.comparePass(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    const token = JWTHandler.generateToken(user._id.toString());

    return token;
  }
}
