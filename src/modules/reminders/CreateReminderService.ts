import { InputReminderDTO } from "../../@types/ReminderTypes";
import { IRemindersRepository } from "../../repositories/IRemindersRepository";

export class CreateReminderService {
  constructor(private remindersRepository: IRemindersRepository) {}

  async execute(input: InputReminderDTO) {
    const reminder = await this.remindersRepository.createReminder(input);
    return reminder;
  }
}
