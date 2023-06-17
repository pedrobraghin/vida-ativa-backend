import {
  InputUserEventsTypeDTO,
  OutputUserEventsTypeDTO,
} from "../../@types/EventsTypes";
import { EventsSchema } from "../../schemas/EventsSchema";
import { IEventsRepository } from "../IEventsRepository";

export class MongoEventsRepository implements IEventsRepository {
  async createEvent(
    input: InputUserEventsTypeDTO
  ): Promise<OutputUserEventsTypeDTO> {
    const event = await EventsSchema.create(input);
    return event;
  }

  async getEvent(
    id: string,
    userId: string
  ): Promise<OutputUserEventsTypeDTO | null> {
    const event = await EventsSchema.findOne({ _id: id, userId });
    return event;
  }

  async index(
    query: Partial<InputUserEventsTypeDTO>,
    fields: string = ""
  ): Promise<{ events: OutputUserEventsTypeDTO[]; eventsCount: number }> {
    const events = await EventsSchema.find(query).select(fields);
    const eventsCount = events.length;

    return { events, eventsCount };
  }

  async deleteEvent(
    id: string,
    userId: string
  ): Promise<OutputUserEventsTypeDTO | null> {
    const deletedEvent = await EventsSchema.findOneAndDelete({
      _id: id,
      userId,
    });
    return deletedEvent;
  }

  async deleteUserEvents(userId: string): Promise<void> {
    await EventsSchema.deleteMany({ userId });
  }

  async updateEvent(
    id: string,
    userId: string,
    input: Partial<InputUserEventsTypeDTO>,
    fields = ""
  ): Promise<OutputUserEventsTypeDTO | null> {
    const updatedEvent = await EventsSchema.findOneAndUpdate(
      { _id: id, userId },
      input,
      {
        new: true,
      }
    ).select(fields);

    return updatedEvent;
  }
}
