import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IContactsRepository } from "../../repositories/IContactsRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class DeleteContactService {
  constructor(private contactsRepository: IContactsRepository) {}

  async execute(id: string, userId: string) {
    const isValidContactId = MongoUtils.isValidId(id);

    if (!isValidContactId) {
      throw new InvalidParameterError("Invalid contact ID.");
    }

    const deletedContact = await this.contactsRepository.deleteContact(
      id,
      userId
    );

    if (!deletedContact) {
      throw new NotFoundError("Contact not found.");
    }

    return deletedContact;
  }
}
