import { InputAppointmentDTO } from "../../@types/AppointmentTypes";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IAppointmentsRepository } from "../../repositories/IAppointmentsRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class UpdateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  async execute(
    id: string,
    userId: string,
    input: Partial<InputAppointmentDTO>
  ) {
    const isValidAppointmentId = MongoUtils.isValidId(id);

    if (!isValidAppointmentId) {
      throw new InvalidParameterError("Invalid appointment ID.");
    }

    const updatedFields = Object.keys(input).join(" ");

    const updatedAppointment =
      await this.appointmentsRepository.updateAppointment(
        id,
        userId,
        input,
        updatedFields
      );

    if (!updatedAppointment) {
      throw new NotFoundError("Appointment not found.");
    }

    return updatedAppointment;
  }
}
