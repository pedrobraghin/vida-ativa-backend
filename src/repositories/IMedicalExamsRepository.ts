import {
  InputMedicalExamDTO,
  OutputMedicalExamDTO,
} from "../@types/MedicalExamTypes";

export interface IMedicalExamsRepository {
  addMedicalExam(input: InputMedicalExamDTO): Promise<OutputMedicalExamDTO>;
  getMedicalExam(
    id: string,
    userId: string
  ): Promise<OutputMedicalExamDTO | null>;
  getAllMedicalExams(userId: string): Promise<OutputMedicalExamDTO[]>;
  deleteMedicalExam(
    id: string,
    userId: string
  ): Promise<OutputMedicalExamDTO | null>;
  updateMedicalExam(
    id: string,
    userId: string,
    input: Partial<InputMedicalExamDTO>,
    fields?: string
  ): Promise<OutputMedicalExamDTO | null>;
  deleteUserMedicalExams(userId: string): Promise<void>;
}
