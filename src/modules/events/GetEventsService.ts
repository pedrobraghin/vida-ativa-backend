import { InputUserEventsTypeDTO } from "../../@types/EventsTypes";
import { IEventsRepository } from "../../repositories/IEventsRepository";

export class GetEventsService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(query: Partial<InputUserEventsTypeDTO>) {
    const { events, eventsCount } = await this.eventsRepository.index(
      query,
      ""
    );
    return { events, eventsCount };
  }
}
