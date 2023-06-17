import { InputReminderDTO, OutputReminderDTO } from "../@types/ReminderTypes";

export interface IRemindersRepository {
  createReminder(input: InputReminderDTO): Promise<OutputReminderDTO>;
  index(
    userId: string,
    query: Partial<InputReminderDTO>,
    fields?: string
  ): Promise<OutputReminderDTO[]>;
  getReminderById(
    id: string,
    userId: string
  ): Promise<OutputReminderDTO | null>;
  updateReminder(
    id: string,
    input: Partial<InputReminderDTO>,
    userId: string,
    fields?: string
  ): Promise<OutputReminderDTO | null>;
  deleteReminder(id: string, userId: string): Promise<OutputReminderDTO | null>;
  deleteUserReminders(userId: string): Promise<void>;
}
