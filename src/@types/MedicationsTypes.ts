export interface InputMedicationDTO {
  userId: String;
  name: String;
  posology: String;
  time: String;
  description: String;
  type: String;
  img?: String;
}

export interface OutputMedicationDTO extends InputMedicationDTO {
  _id: String;
  createdAt: String;
  updatedAt: String;
}
