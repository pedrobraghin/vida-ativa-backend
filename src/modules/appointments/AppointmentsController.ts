import { Request, Response, NextFunction } from "express";

import AppointmentsRepository from "./AppointmentsRepository";

import { EStatusCode } from "../../enums/EStatusCode";
import { InputAppointmentDTO } from "../../@types/AppointmentTypes";
import { UpdateAppointmentService } from "./UpdateAppointmentService";
import { DeleteAppointmentService } from "./DeleteAppointmentService";
import { CreateAppointmentService } from "./CreateAppointmentService";
import { GetAllAppointmentsService } from "./GetAllAppointmentsService";
import { GetAppointmentByIdService } from "./GetAppointmentByIdService";
import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { IAppointmentsRepository } from "../../repositories/IAppointmentsRepository";

export class AppointmentsController {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  @CatchExpressError
  async createAppointment(req: Request, res: Response, _next: NextFunction) {
    const input: InputAppointmentDTO = req.body;
    const createAppointmentService = new CreateAppointmentService(
      this.appointmentsRepository
    );
    const userId = req.app.locals.user._id.toString();
    input.userId = userId;
    const appointment = await createAppointmentService.execute(input);

    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: appointment,
    });
  }

  @CatchExpressError
  async getAppointment(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userId = req.app.locals.user._id.toString();
    const getAppointmentByIdService = new GetAppointmentByIdService(
      this.appointmentsRepository
    );

    const appointment = await getAppointmentByIdService.execute(id, userId);

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: appointment,
    });
  }

  @CatchExpressError
  async getAllAppointments(req: Request, res: Response, _next: NextFunction) {
    const userId = req.app.locals.user._id.toString();
    const getAllAppointmentsService = new GetAllAppointmentsService(
      this.appointmentsRepository
    );

    const appointments = await getAllAppointmentsService.execute(userId);
    return res.status(EStatusCode.OK).json({
      status: "success",
      results: appointments.length,
      data: appointments,
    });
  }

  @CatchExpressError
  async deleteAppointment(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userId = req.app.locals.user._id.toString();
    const deleteAppointmentService = new DeleteAppointmentService(
      this.appointmentsRepository
    );

    const deletedAppointment = await deleteAppointmentService.execute(
      id,
      userId
    );

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: deletedAppointment,
    });
  }

  @CatchExpressError
  async updateAppointment(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const input: InputAppointmentDTO = req.body;

    const userId = req.app.locals.user._id.toString();
    const updateAppointmentService = new UpdateAppointmentService(
      this.appointmentsRepository
    );

    const updatedAppointment = await updateAppointmentService.execute(
      id,
      userId,
      input
    );

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: updatedAppointment,
    });
  }
}

export default new AppointmentsController(AppointmentsRepository);
