import { MongoUtils } from "../../utils/MongoUtils";
import { NotFoundError } from "../../errors/NotFoundError";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { InvalidParameterError } from "../../errors/InvalidParameterError";

export class GetEventByIdService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(id: string, userId: string) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParameterError("Invalid ID.");
    }

    const event = await this.eventsRepository.getEvent(id, userId);

    if (!event) {
      throw new NotFoundError("Event not found.");
    }

    return event;
  }
}
