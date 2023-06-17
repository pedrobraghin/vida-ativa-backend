import { IAppointmentsRepository } from "../../repositories/IAppointmentsRepository";

export class GetAllAppointmentsService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  async execute(userId: string) {
    const appointments = await this.appointmentsRepository.index(userId);
    return appointments;
  }
}
