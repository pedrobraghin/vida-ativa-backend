import { InputAppointmentDTO } from "../../@types/AppointmentTypes";
import { IAppointmentsRepository } from "../../repositories/IAppointmentsRepository";

export class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  async execute(input: InputAppointmentDTO) {
    const appointment = await this.appointmentsRepository.createAppointment(
      input
    );
    return appointment;
  }
}
