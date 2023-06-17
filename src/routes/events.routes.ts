import { Router } from "express";
import { auth } from "../middlewares/auth";
import EventsController from "../modules/events/EventsController";

const eventsRouter = Router();

eventsRouter.use(auth);
eventsRouter.post("/", EventsController.createEvent);
eventsRouter.get("/", EventsController.getAllEvents);
eventsRouter.get("/:id", EventsController.getEvent);
eventsRouter.delete("/:id", EventsController.deleteEvent);
eventsRouter.patch("/:id", EventsController.updateEvent);

export { eventsRouter };
