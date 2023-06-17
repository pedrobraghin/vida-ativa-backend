import {
  InputReminderDTO,
  OutputReminderDTO,
} from "../../@types/ReminderTypes";
import { ReminderSchema } from "../../schemas/ReminderSchema";
import { IRemindersRepository } from "../IRemindersRepository";

export class MongoRemindersRepository implements IRemindersRepository {
  async createReminder(input: InputReminderDTO): Promise<OutputReminderDTO> {
    const reminder = await ReminderSchema.create(input);
    return reminder;
  }

  async index(
    userId: string,
    query: Partial<InputReminderDTO>,
    fields: string = ""
  ): Promise<OutputReminderDTO[]> {
    const reminder = await ReminderSchema.find({
      userId,
      ...query,
    }).select(fields);
    return reminder;
  }

  async getReminderById(
    id: string,
    userId: string
  ): Promise<OutputReminderDTO | null> {
    const reminder = await ReminderSchema.findOne({ _id: id, userId });
    return reminder;
  }

  async updateReminder(
    id: string,
    input: Partial<InputReminderDTO>,
    userId: string,
    fields = ""
  ): Promise<OutputReminderDTO | null> {
    const updatedReminder = await ReminderSchema.findOneAndUpdate(
      { _id: id, userId },
      input,
      { new: true }
    ).select(fields);
    return updatedReminder;
  }

  async deleteReminder(
    id: string,
    userId: string
  ): Promise<OutputReminderDTO | null> {
    const deletedReminder = await ReminderSchema.findOneAndDelete({
      _id: id,
      userId: userId,
    });
    return deletedReminder;
  }

  async deleteUserReminders(userId: string): Promise<void> {
    await ReminderSchema.deleteMany({ userId });
  }
}
