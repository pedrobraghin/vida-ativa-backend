import { MongoUtils } from "../../utils/MongoUtils";
import { NotFoundError } from "../../errors/NotFoundError";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IMedicationsRepository } from "../../repositories/IMedicationsRepository";

export class DeleteMedicationService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(id: string, userId: string) {
    const isValidMedicationId = MongoUtils.isValidId(id);

    if (!isValidMedicationId) {
      throw new InvalidParameterError("Invalid medication ID.");
    }

    const deletedMedication = await this.medicationsRepository.deleteMedication(
      id,
      userId
    );

    if (!deletedMedication) {
      throw new NotFoundError("Medication not found.");
    }

    return deletedMedication;
  }
}
