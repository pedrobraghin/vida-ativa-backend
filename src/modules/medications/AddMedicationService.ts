import { InputMedicationDTO } from "../../@types/MedicationsTypes";
import { IMedicationsRepository } from "../../repositories/IMedicationsRepository";

export class AddMedicationService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(input: InputMedicationDTO) {
    const medication = await this.medicationsRepository.addMedication(input);
    return medication;
  }
}
