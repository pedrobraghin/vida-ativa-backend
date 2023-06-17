import { IMedicationsRepository } from "../../../repositories/IMedicationsRepository";

export class DeleteMedicationHistoryService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(id: string, userId: string) {}
}
