import { MongoUtils } from "../../utils/MongoUtils";
import { NotFoundError } from "../../errors/NotFoundError";
import { InputReminderDTO } from "../../@types/ReminderTypes";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IRemindersRepository } from "../../repositories/IRemindersRepository";

export class UpdateReminderService {
  constructor(private reminderRepository: IRemindersRepository) {}

  async execute(id: string, input: Partial<InputReminderDTO>, userId: string) {
    const isValidReminderId = MongoUtils.isValidId(id);

    if (!isValidReminderId) {
      throw new InvalidParameterError("Invalid Reminder ID.");
    }

    const updatedFields = Object.keys(input).join(" ");

    const updatedReminder = await this.reminderRepository.updateReminder(
      id,
      input,
      userId,
      updatedFields
    );

    if (!updatedReminder) {
      throw new NotFoundError("Reminder not found.");
    }

    return updatedReminder;
  }
}
