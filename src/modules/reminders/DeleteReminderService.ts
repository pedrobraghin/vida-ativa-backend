import { MongoUtils } from "../../utils/MongoUtils";
import { NotFoundError } from "../../errors/NotFoundError";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IRemindersRepository } from "../../repositories/IRemindersRepository";

export class DeleteReminderService {
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
