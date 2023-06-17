import { IEventsRepository } from "../../repositories/IEventsRepository";
import { MongoEventsRepository } from "../../repositories/implementations/MongoEventsRepository";

const EventsRepository: IEventsRepository = new MongoEventsRepository();

export default EventsRepository;
