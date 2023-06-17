import { InputContactDTO } from "../../@types/ContactTypes";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IContactsRepository } from "../../repositories/IContactsRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class UpdateContactService {
  constructor(private contactsRepository: IContactsRepository) {}

  async execute(id: string, userId: string, input: Partial<InputContactDTO>) {
    const isValidContactId = MongoUtils.isValidId(id);

    if (!isValidContactId) {
      throw new InvalidParameterError("Invalid contact ID.");
    }

    const updatedFields = Object.keys(input).join(" ");

    const updatedContact = await this.contactsRepository.updateContact(
      id,
      userId,
      input,
      updatedFields
    );

    if (!updatedContact) {
      throw new NotFoundError("Contact not found.");
    }

    return updatedContact;
  }
}
