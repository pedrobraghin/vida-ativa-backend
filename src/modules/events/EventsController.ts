import { Request, Response, NextFunction } from "express";

import EventsRepository from "./EventsRepository";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { EStatusCode } from "../../enums/EStatusCode";
import { CreateEventService } from "./CreateEventService";
import { InputUserEventsTypeDTO } from "../../@types/EventsTypes";
import { GetEventByIdService } from "./GetEventByIdService";
import { GetEventsService } from "./GetEventsService";
import { DeleteEventService } from "./DeleteEventService";
import { UpdateEventService } from "./UpdateEventService";

class EventsController {
  constructor(private eventsRepository: IEventsRepository) {}

  @CatchExpressError
  async createEvent(req: Request, res: Response, _next: NextFunction) {
    const input: InputUserEventsTypeDTO = req.body;
    const userId = req.app.locals.user._id.toString();
    input.userId = userId;
    const createEventService = new CreateEventService(this.eventsRepository);
    const event = await createEventService.execute(input);

    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: event,
    });
  }

  @CatchExpressError
  async getEvent(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    const getEventByIdService = new GetEventByIdService(this.eventsRepository);

    const userId = req.app.locals.user._id.toString();
    const event = await getEventByIdService.execute(id, userId);

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: event,
    });
  }

  @CatchExpressError
  async getAllEvents(req: Request, res: Response, _next: NextFunction) {
    const getEventsService = new GetEventsService(this.eventsRepository);
    const query: Partial<InputUserEventsTypeDTO> = req.query;

    const userId = req.app.locals.user._id.toString();
    query.userId = userId;

    const { events, eventsCount } = await getEventsService.execute(query);

    return res.status(EStatusCode.OK).json({
      results: eventsCount,
      status: "success",
      data: events,
    });
  }

  @CatchExpressError
  async deleteEvent(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const deleteEventService = new DeleteEventService(this.eventsRepository);
    const userId = req.app.locals.user._id.toString();

    const deletedEvent = await deleteEventService.execute(id, userId);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: deletedEvent,
    });
  }

  @CatchExpressError
  async updateEvent(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const input: Partial<InputUserEventsTypeDTO> = req.body;
    const userId = req.app.locals.user._id.toString();

    const updateEventService = new UpdateEventService(this.eventsRepository);
    const event = await updateEventService.execute(id, userId, input);

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: event,
    });
  }
}

export default new EventsController(EventsRepository);
