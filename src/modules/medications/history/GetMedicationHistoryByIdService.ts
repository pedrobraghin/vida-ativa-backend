import { IMedicationsRepository } from "../../../repositories/IMedicationsRepository";

export class GetMedicationHistoryByIdService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(id: string, userId: string) {}
}
