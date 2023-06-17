import { InputContactDTO, OutputContactDTO } from "../@types/ContactTypes";

export interface IContactsRepository {
  createContact(input: InputContactDTO): Promise<OutputContactDTO>;
  getContact(id: string, userId: string): Promise<OutputContactDTO | null>;
  index(userId: string): Promise<OutputContactDTO[]>;
  updateContact(
    id: string,
    userId: string,
    input: Partial<InputContactDTO>,
    fields?: string
  ): Promise<OutputContactDTO | null>;
  deleteContact(id: string, userId: string): Promise<OutputContactDTO | null>;
  deleteUserContacts(userId: string): Promise<void>;
}
