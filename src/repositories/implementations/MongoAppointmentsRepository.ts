import {
  InputAppointmentDTO,
  OutputAppointmentDTO,
} from "../../@types/AppointmentTypes";
import { AppointmentSchema } from "../../schemas/AppointmentSchema";
import { IAppointmentsRepository } from "../IAppointmentsRepository";

export class MongoAppointmentsRepository implements IAppointmentsRepository {
  async createAppointment(
    input: InputAppointmentDTO
  ): Promise<OutputAppointmentDTO> {
    const appointment = await AppointmentSchema.create(input);
    return appointment;
  }

  async getAppointment(
    id: string,
    userId: string
  ): Promise<OutputAppointmentDTO | null> {
    const appointment = await AppointmentSchema.findOne({ _id: id, userId });
    return appointment;
  }

  async index(userId: string): Promise<OutputAppointmentDTO[]> {
    const appointments = await AppointmentSchema.find({ userId });
    return appointments;
  }

  async deleteAppointment(
    id: string,
    userId: string
  ): Promise<OutputAppointmentDTO | null> {
    const deletedAppointment = await AppointmentSchema.findOneAndDelete({
      _id: id,
      userId,
    });
    return deletedAppointment;
  }

  async updateAppointment(
    id: string,
    userId: string,
    input: Partial<InputAppointmentDTO>,
    fields = ""
  ): Promise<OutputAppointmentDTO | null> {
    const updatedAppointment = await AppointmentSchema.findOneAndUpdate(
      { _id: id, userId },
      input,
      { new: true }
    ).select(fields);
    return updatedAppointment;
  }

  async deleteUserAppointments(userId: string): Promise<void> {
    await AppointmentSchema.deleteMany({ userId });
  }
}
