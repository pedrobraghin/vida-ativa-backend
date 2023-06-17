import { Router } from "express";
import { auth } from "../middlewares/auth";

import AppointmentsController from "../modules/appointments/AppointmentsController";
const appointmentsRouter = Router();

appointmentsRouter.use(auth);
appointmentsRouter.post("/", AppointmentsController.createAppointment);
appointmentsRouter.get("/", AppointmentsController.getAllAppointments);
appointmentsRouter.get("/:id", AppointmentsController.getAppointment);
appointmentsRouter.delete("/:id", AppointmentsController.deleteAppointment);
appointmentsRouter.patch("/:id", AppointmentsController.updateAppointment);

export { appointmentsRouter };
