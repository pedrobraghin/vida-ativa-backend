export interface ContactType {}

export interface InputContactDTO {
  name: string;
  phoneNumber: string;
  img?: string;
  userId?: String;
}

export interface OutputContactDTO extends InputContactDTO {
  _id: String;
  createdAt: String;
  updatedAt: String;
}
