import { IRemindersRepository } from "../../repositories/IRemindersRepository";
import { MongoRemindersRepository } from "../../repositories/implementations/MongoRemindersRepository";

const RemindersRepository: IRemindersRepository =
  new MongoRemindersRepository();

export default RemindersRepository;
