import { IMedicationsRepository } from "../../../repositories/IMedicationsRepository";

export class GetUserMedicationHistoryService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(userId: string) {}
}
