import { InputReminderDTO } from "../../@types/ReminderTypes";
import { IRemindersRepository } from "../../repositories/IRemindersRepository";

export class GetAllRemindersService {
  constructor(private remindersRepository: IRemindersRepository) {}

  async execute(query: Partial<InputReminderDTO>, userId: string) {
    const reminders = await this.remindersRepository.index(userId, query, "");
    return reminders;
  }
}
