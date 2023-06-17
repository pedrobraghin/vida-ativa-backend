import { InputMedicationHistoryDTO } from "../../../@types/NotificationsTypes";
import { IMedicationsRepository } from "../../../repositories/IMedicationsRepository";

export class AddMedicationHistoryService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(input: InputMedicationHistoryDTO) {}
}
