import { InputUserEventsTypeDTO } from "../../@types/EventsTypes";
import { IEventsRepository } from "../../repositories/IEventsRepository";

export class CreateEventService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(input: InputUserEventsTypeDTO) {
    const event = await this.eventsRepository.createEvent(input);

    return event;
  }
}
