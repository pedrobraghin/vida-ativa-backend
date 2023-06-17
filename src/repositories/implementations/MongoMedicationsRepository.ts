import {
  InputMedicationDTO,
  OutputMedicationDTO,
} from "../../@types/MedicationsTypes";
import { MedicationSchema } from "../../schemas/MedicationSchema";
import { IMedicationsRepository } from "../IMedicationsRepository";

export class MongoMedicationsRepository implements IMedicationsRepository {
  async addMedication(input: InputMedicationDTO): Promise<OutputMedicationDTO> {
    const medication = await MedicationSchema.create(input);
    return medication;
  }

  async getMedication(
    id: string,
    userId: string
  ): Promise<OutputMedicationDTO | null> {
    const medication = await MedicationSchema.findOne({ _id: id, userId });
    return medication;
  }

  async index(userId: string): Promise<OutputMedicationDTO[]> {
    const medications = await MedicationSchema.find({ userId });
    return medications;
  }

  async updateMedication(
    id: string,
    userId: string,
    input: Partial<InputMedicationDTO>,
    fields = ""
  ): Promise<OutputMedicationDTO | null> {
    const updatedMedication = await MedicationSchema.findOneAndUpdate(
      { _id: id, userId },
      input,
      { new: true }
    ).select(fields);
    return updatedMedication;
  }

  async deleteMedication(
    id: string,
    userId: string
  ): Promise<OutputMedicationDTO | null> {
    const deletedMedication = await MedicationSchema.findOneAndDelete({
      _id: id,
      userId: userId,
    });
    return deletedMedication;
  }

  async deleteUserMedications(userId: string): Promise<void> {
    await MedicationSchema.deleteMany({ userId });
  }
}
