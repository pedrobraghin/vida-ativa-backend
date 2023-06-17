import { MongoUtils } from "../../utils/MongoUtils";
import { NotFoundError } from "../../errors/NotFoundError";
import { InputUserEventsTypeDTO } from "../../@types/EventsTypes";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IEventsRepository } from "../../repositories/IEventsRepository";

export class UpdateEventService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(
    id: string,
    userId: string,
    input: Partial<InputUserEventsTypeDTO>
  ) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParameterError("Invalid ID.");
    }

    const updatedFields = Object.keys(input).join(" ");

    const event = await this.eventsRepository.updateEvent(
      id,
      userId,
      input,
      updatedFields
    );

    if (!event) {
      throw new NotFoundError("Event not found.");
    }

    return event;
  }
}
