export interface InputNotificationDTO {
  from?: String;
  to: String;
  payload: any;
}

export interface InputMedicationHistoryDTO {
  medicationId: String;
  userId: String;
  isIngested: boolean;
  date: String;
}

export interface OutputMedicationHistoryDTO extends InputMedicationHistoryDTO {
  _id: String;
  createdAt: String;
  updatedAt: String;
}
