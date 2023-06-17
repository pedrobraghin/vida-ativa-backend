import { IMedicationsRepository } from "../../../repositories/IMedicationsRepository";

export class DeleteAllMedicationHistoryService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(medicationId: string, userId: string) {}
}
