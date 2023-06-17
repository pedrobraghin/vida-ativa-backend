export interface InputReminderDTO {
  title: string;
  userId: String;
  completed: boolean;
}

export interface OutputReminderDTO extends InputReminderDTO {
  _id: string;
  createdA: String;
  updatedAt: String;
}
