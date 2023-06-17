import { Router } from "express";
import RemindersController from "../modules/reminders/RemindersController";
import { auth } from "../middlewares/auth";

const remindersRouter = Router();

remindersRouter.use(auth);
remindersRouter.post("/", RemindersController.createReminder);
remindersRouter.get("/", RemindersController.getAllReminders);
remindersRouter.get("/:id", RemindersController.getReminder);
remindersRouter.patch("/:id", RemindersController.updateReminder);
remindersRouter.delete("/:id", RemindersController.deleteReminder);

export { remindersRouter };
