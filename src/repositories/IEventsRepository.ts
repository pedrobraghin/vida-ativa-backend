import {
  InputUserEventsTypeDTO,
  OutputUserEventsTypeDTO,
} from "../@types/EventsTypes";

export interface IEventsRepository {
  createEvent(input: InputUserEventsTypeDTO): Promise<OutputUserEventsTypeDTO>;
  getEvent(id: string, userId: string): Promise<OutputUserEventsTypeDTO | null>;
  index(
    query: Partial<InputUserEventsTypeDTO>,
    fields?: string
  ): Promise<{ events: OutputUserEventsTypeDTO[]; eventsCount: number }>;
  deleteEvent(
    id: string,
    userId: string
  ): Promise<OutputUserEventsTypeDTO | null>;
  updateEvent(
    id: string,
    userId: string,
    input: Partial<InputUserEventsTypeDTO>,
    fields?: string
  ): Promise<OutputUserEventsTypeDTO | null>;
  deleteUserEvents(userId: string): Promise<void>;
}
