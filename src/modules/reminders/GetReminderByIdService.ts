import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IRemindersRepository } from "../../repositories/IRemindersRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class GetReminderByIdService {
  constructor(private remindersRepository: IRemindersRepository) {}

  async execute(id: string, userId: string) {
    const isValidReminderId = MongoUtils.isValidId(id);
    if (!isValidReminderId) {
      throw new InvalidParameterError("Invalid Reminder ID.");
    }

    const reminder = await this.remindersRepository.deleteReminder(id, userId);

    if (!reminder) {
      throw new NotFoundError("Reminder not found.");
    }

    return reminder;
  }
}
