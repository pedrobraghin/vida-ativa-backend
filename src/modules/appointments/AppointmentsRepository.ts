import { IAppointmentsRepository } from "../../repositories/IAppointmentsRepository";
import { MongoAppointmentsRepository } from "../../repositories/implementations/MongoAppointmentsRepository";

const AppointmentsRepository: IAppointmentsRepository =
  new MongoAppointmentsRepository();

export default AppointmentsRepository;
