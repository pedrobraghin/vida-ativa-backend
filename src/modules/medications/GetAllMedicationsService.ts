import { IMedicationsRepository } from "../../repositories/IMedicationsRepository";

export class GetAllMedicationsService {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  async execute(userId: string) {
    const medications = await this.medicationsRepository.index(userId);
    return medications;
  }
}
