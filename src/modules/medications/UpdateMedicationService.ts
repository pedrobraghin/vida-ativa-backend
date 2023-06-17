import { MongoUtils } from "../../utils/MongoUtils";
import { NotFoundError } from "../../errors/NotFoundError";
import { InputMedicationDTO } from "../../@types/MedicationsTypes";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IMedicationsRepository } from "../../repositories/IMedicationsRepository";

export class UpdateMedicationService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(
    id: string,
    userId: string,
    input: Partial<InputMedicationDTO>
  ) {
    const isValidMedicationId = MongoUtils.isValidId(id);

    if (!isValidMedicationId) {
      throw new InvalidParameterError("Invalid medication ID.");
    }

    const updatedFields = Object.keys(input).join(" ");

    const updatedMedication = await this.medicationsRepository.updateMedication(
      id,
      userId,
      input,
      updatedFields
    );

    if (!updatedMedication) {
      throw new NotFoundError("Medication not found.");
    }

    return updatedMedication;
  }
}
