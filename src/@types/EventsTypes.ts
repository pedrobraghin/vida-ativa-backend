export interface InputUserEventsTypeDTO {
  userId: String;
  title: String;
  location?: String;
  date: String;
}

export interface OutputUserEventsTypeDTO extends InputUserEventsTypeDTO {
  _id: String;
  createdAt: String;
  updatedAt: String;
}
