import { ContactSchema } from "../../schemas/ContactSchema";
import { IContactsRepository } from "../IContactsRepository";
import { InputContactDTO, OutputContactDTO } from "../../@types/ContactTypes";

export class MongoContactsRepository implements IContactsRepository {
  async createContact(input: InputContactDTO): Promise<OutputContactDTO> {
    const contact = await ContactSchema.create(input);
    return contact;
  }

  async getContact(
    id: string,
    userId: string
  ): Promise<OutputContactDTO | null> {
    const contact = await ContactSchema.findOne({ _id: id, userId });
    return contact;
  }

  async index(userId: string): Promise<OutputContactDTO[]> {
    const contact = await ContactSchema.find({ userId });
    return contact;
  }

  async updateContact(
    id: string,
    userId: string,
    input: Partial<InputContactDTO>,
    fields = ""
  ): Promise<OutputContactDTO | null> {
    const updatedContact = await ContactSchema.findOneAndUpdate(
      { _id: id, userId: userId },
      input,
      { new: true }
    ).select(fields);

    return updatedContact;
  }

  async deleteContact(
    id: string,
    userId: string
  ): Promise<OutputContactDTO | null> {
    const deletedContact = await ContactSchema.findOneAndDelete({
      _id: id,
      userId: userId,
    });
    return deletedContact;
  }
  async deleteUserContacts(userId: string): Promise<void> {
    await ContactSchema.deleteMany({ userId });
  }
}
