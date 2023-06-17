import { IMedicationsRepository } from "../../../repositories/IMedicationsRepository";

export class GetAllMedicationHistoryService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(id: string, userId: string) {}
}
