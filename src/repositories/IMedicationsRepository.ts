import {
  InputMedicationDTO,
  OutputMedicationDTO,
} from "../@types/MedicationsTypes";

export interface IMedicationsRepository {
  addMedication(input: InputMedicationDTO): Promise<OutputMedicationDTO>;
  getMedication(
    id: string,
    userId: string
  ): Promise<OutputMedicationDTO | null>;
  index(userId: string): Promise<OutputMedicationDTO[]>;
  updateMedication(
    id: string,
    userId: string,
    input: Partial<InputMedicationDTO>,
    fields?: string
  ): Promise<OutputMedicationDTO | null>;
  deleteMedication(
    id: string,
    userId: string
  ): Promise<OutputMedicationDTO | null>;
  deleteUserMedications(userId: string): Promise<void>;
}
