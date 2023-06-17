import { IMedicationsRepository } from "../../repositories/IMedicationsRepository";
import { MongoMedicationsRepository } from "../../repositories/implementations/MongoMedicationsRepository";

const MedicationsRepository: IMedicationsRepository =
  new MongoMedicationsRepository();

export default MedicationsRepository;
