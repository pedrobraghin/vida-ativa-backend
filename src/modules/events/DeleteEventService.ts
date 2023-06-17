import { MongoUtils } from "../../utils/MongoUtils";
import { NotFoundError } from "../../errors/NotFoundError";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { InvalidParameterError } from "../../errors/InvalidParameterError";

export class DeleteEventService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(id: string, userId: string) {
    const isValidEventId = MongoUtils.isValidId(id);

    if (!isValidEventId) {
      throw new InvalidParameterError("Invalid event ID.");
    }

    const deletedEvent = await this.eventsRepository.deleteEvent(id, userId);

    if (!deletedEvent) {
      throw new NotFoundError("Event not found.");
    }

    return deletedEvent;
  }
}
