import { IUsersRepository } from "../../repositories/IUsersRepository";

export class VerifyEmailAvailabilityService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(email: string) {
    const isEmailAvailable = await this.usersRepository.verifyEmailAvailability(
      email
    );
    return isEmailAvailable;
  }
}
