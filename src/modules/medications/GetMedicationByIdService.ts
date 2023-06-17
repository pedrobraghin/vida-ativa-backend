import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IMedicationsRepository } from "../../repositories/IMedicationsRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class GetMedicationByIdService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(id: string, userId: string) {
    const isValidMedicationId = MongoUtils.isValidId(id);

    if (!isValidMedicationId) {
      throw new InvalidParameterError("Invalid medication ID.");
    }
    const medication = await this.medicationsRepository.getMedication(
      id,
      userId
    );

    if (!medication) {
      throw new NotFoundError("Medication not found.");
    }

    return medication;
  }
}
