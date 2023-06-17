import { InputContactDTO } from "./ContactTypes";

export interface InputUserDTO {
  name: {
    first: string;
    last: string;
  };
  img?: {
    regular: string;
  };
  email: string;
  password: string;
  passwordConfirm: string;
  accountType: AccountTypes;
  birthDate: string;
  address: string;
  phoneNumber: string;
  sex: string;
  emergencyContact: InputContactDTO;
}

export interface OutputUserDTO extends InputUserDTO {
  _id: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

export enum AccountTypes {
  CAREGIVER,
  ELDERLY,
}

export type UserQuery = Partial<{
  _id: string;
  email: string;
}>;
