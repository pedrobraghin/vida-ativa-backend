import {
  InputMedicalExamDTO,
  OutputMedicalExamDTO,
} from "../../@types/MedicalExamTypes";
import { MedicalExamSchema } from "../../schemas/MedicalExamSchema";
import { IMedicalExamsRepository } from "../IMedicalExamsRepository";

export class MongoMedicalExamsRepository implements IMedicalExamsRepository {
  async addMedicalExam(
    input: InputMedicalExamDTO
  ): Promise<OutputMedicalExamDTO> {
    const exam = await MedicalExamSchema.create(input);
    return exam;
  }

  async getMedicalExam(
    id: string,
    userId: string
  ): Promise<OutputMedicalExamDTO | null> {
    const exam = await MedicalExamSchema.findOne({ _id: id, userId });
    return exam;
  }

  async getAllMedicalExams(userId: string): Promise<OutputMedicalExamDTO[]> {
    const exams = await MedicalExamSchema.find({
      userId,
    });
    return exams;
  }

  async deleteMedicalExam(
    id: string,
    userId: string
  ): Promise<OutputMedicalExamDTO | null> {
    const deletedExam = await MedicalExamSchema.findOneAndDelete({
      _id: id,
      userId,
    });
    return deletedExam;
  }

  async updateMedicalExam(
    id: string,
    userId: string,
    input: Partial<InputMedicalExamDTO>,
    fields: string = ""
  ): Promise<OutputMedicalExamDTO | null> {
    const updatedExam = await MedicalExamSchema.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      input,
      { new: true }
    ).select(fields);

    return updatedExam;
  }

  async deleteUserMedicalExams(userId: string): Promise<void> {
    await MedicalExamSchema.deleteMany({
      userId,
    });
  }
}
