import { MongoUtils } from "../../utils/MongoUtils";
import { NotFoundError } from "../../errors/NotFoundError";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IAppointmentsRepository } from "../../repositories/IAppointmentsRepository";

export class GetAppointmentByIdService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  async execute(id: string, userId: string) {
    const isValidAppointmentId = MongoUtils.isValidId(id);

    if (!isValidAppointmentId) {
      throw new InvalidParameterError("Invalid appointment ID.");
    }

    const appointment = await this.appointmentsRepository.getAppointment(
      id,
      userId
    );

    if (!appointment) {
      throw new NotFoundError("Appointment not found.");
    }

    return appointment;
  }
}
