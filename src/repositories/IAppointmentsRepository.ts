import {
  InputAppointmentDTO,
  OutputAppointmentDTO,
} from "./../@types/AppointmentTypes";
export interface IAppointmentsRepository {
  createAppointment(input: InputAppointmentDTO): Promise<OutputAppointmentDTO>;
  getAppointment(
    id: string,
    userId: string
  ): Promise<OutputAppointmentDTO | null>;
  index(userId: string): Promise<OutputAppointmentDTO[]>;
  deleteAppointment(
    id: string,
    userId: string
  ): Promise<OutputAppointmentDTO | null>;
  updateAppointment(
    id: string,
    userId: string,
    input: Partial<InputAppointmentDTO>,
    fields?: string
  ): Promise<OutputAppointmentDTO | null>;
  deleteUserAppointments(userId: string): Promise<void>;
}
