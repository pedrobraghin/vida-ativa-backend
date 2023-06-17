import { Router } from "express";

import { userRouter } from "./users.routes";
import { eventsRouter } from "./events.routes";
import { friendsRouter } from "./friends.routes";
import { contactRouter } from "./contacts.routes";
import { remindersRouter } from "./reminders.routes";
import { healthDataRouter } from "./healthData.routes";
import { medicationsRouter } from "./medications.routes";
import { appointmentsRouter } from "./appointments.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/events", eventsRouter);
router.use("/friends", friendsRouter);
router.use("/contacts", contactRouter);
router.use("/health", healthDataRouter);
router.use("/reminders", remindersRouter);
router.use("/medications", medicationsRouter);
router.use("/appointments", appointmentsRouter);

export default router;
