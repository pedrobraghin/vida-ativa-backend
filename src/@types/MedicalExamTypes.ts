import { InputHealthDataDTO } from "./HealthDataTypes";

export interface InputMedicalExamDTO {
  userId: String;
  name: String;
  healthData: InputHealthDataDTO;
  date: String;
}

export interface OutputMedicalExamDTO extends InputMedicalExamDTO {
  _id: String;
  createdAt: String;
  updatedAt: String;
}
