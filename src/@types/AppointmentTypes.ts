export interface InputAppointmentDTO {
  userId: String;
  location: String;
  doctor: String;
  date: String;
  title: String;
  description?: String;
}

export interface OutputAppointmentDTO extends InputAppointmentDTO {
  _id: String;
  createdAt: String;
  updatedAt: String;
}
